import { supabase } from './supabase';

export interface AggregatedStats {
  landing: {
    avgStressClean: number;
    avgStressCluttered: number;
    cleanEasierPercent: number;
  };
  gestalt: {
    avgTimeA: number;
    avgTimeB: number;
    fasterAPercent: number;
  };
  schema: {
    easierAPercent: number;
    trustworthyAPercent: number;
  };
  trust: {
    productDistribution: { name: string; value: number }[];
    avgTrustByProduct: { product: string; avgTrust: number }[];
    purchaseIntentByProduct: { product: string; yes: number; no: number }[];
  };
  dopamine: {
    avgWheelSpins: number;
    avgDirectClaimed: number;
  };
  totalResponses: number;
}

export async function getAggregatedStats(): Promise<AggregatedStats> {
  try {
    // Landing page stats
    const { data: landingData } = await supabase
      .from('landing_responses')
      .select('version_shown, stress_rating, easier_version');

    const cleanStress = landingData?.filter(r => r.version_shown === 'clean').map(r => r.stress_rating) || [];
    const clutteredStress = landingData?.filter(r => r.version_shown === 'cluttered').map(r => r.stress_rating) || [];
    const easierChoices = landingData?.map(r => r.easier_version).filter(Boolean) || [];

    // Gestalt stats
    const { data: gestaltData } = await supabase
      .from('gestalt_responses')
      .select('screen_a_time, screen_b_time, faster_screen');

    // Schema stats
    const { data: schemaData } = await supabase
      .from('schema_responses')
      .select('easier_layout, more_trustworthy_layout');

    // Trust stats
    const { data: trustData } = await supabase
      .from('trust_responses')
      .select('selected_product, trust_rating, purchase_intent');

    // Dopamine stats
    const { data: dopamineData } = await supabase
      .from('dopamine_responses')
      .select('wheel_spins, direct_claimed');

    // Calculate aggregations
    const totalResponses = Math.max(
      landingData?.length || 0,
      gestaltData?.length || 0,
      schemaData?.length || 0,
      trustData?.length || 0,
      dopamineData?.length || 0
    );

    return {
      landing: {
        avgStressClean: cleanStress.length > 0
          ? cleanStress.reduce((a, b) => a + b, 0) / cleanStress.length
          : 0,
        avgStressCluttered: clutteredStress.length > 0
          ? clutteredStress.reduce((a, b) => a + b, 0) / clutteredStress.length
          : 0,
        cleanEasierPercent: easierChoices.length > 0
          ? (easierChoices.filter(c => c === 'clean').length / easierChoices.length) * 100
          : 0,
      },
      gestalt: {
        avgTimeA: gestaltData && gestaltData.length > 0
          ? gestaltData.reduce((sum, r) => sum + (r.screen_a_time || 0), 0) / gestaltData.length
          : 0,
        avgTimeB: gestaltData && gestaltData.length > 0
          ? gestaltData.reduce((sum, r) => sum + (r.screen_b_time || 0), 0) / gestaltData.length
          : 0,
        fasterAPercent: gestaltData && gestaltData.length > 0
          ? (gestaltData.filter(r => r.faster_screen === 'A').length / gestaltData.length) * 100
          : 0,
      },
      schema: {
        easierAPercent: schemaData && schemaData.length > 0
          ? (schemaData.filter(r => r.easier_layout === 'A').length / schemaData.length) * 100
          : 0,
        trustworthyAPercent: schemaData && schemaData.length > 0
          ? (schemaData.filter(r => r.more_trustworthy_layout === 'A').length / schemaData.length) * 100
          : 0,
      },
      trust: (() => {
        if (!trustData || trustData.length === 0) {
          return {
            productDistribution: [],
            avgTrustByProduct: [],
            purchaseIntentByProduct: [],
          };
        }

        // Product distribution
        const productCounts: Record<string, number> = {};
        trustData.forEach((r) => {
          if (r.selected_product) {
            productCounts[r.selected_product] = (productCounts[r.selected_product] || 0) + 1;
          }
        });
        const productDistribution = Object.entries(productCounts).map(([key, value]) => ({
          name: key === 'prosound-headphones' ? 'ProSound' : key === 'audiomax-headphones' ? 'AudioMax' : 'SoundWave',
          value,
        }));

        // Average trust by product
        const trustByProduct: Record<string, number[]> = {};
        trustData.forEach((r) => {
          if (r.selected_product && r.trust_rating) {
            if (!trustByProduct[r.selected_product]) {
              trustByProduct[r.selected_product] = [];
            }
            trustByProduct[r.selected_product].push(r.trust_rating);
          }
        });
        const avgTrustByProduct = Object.entries(trustByProduct).map(([key, ratings]) => ({
          product: key === 'prosound-headphones' ? 'ProSound' : key === 'audiomax-headphones' ? 'AudioMax' : 'SoundWave',
          avgTrust: ratings.reduce((sum, r) => sum + r, 0) / ratings.length,
        }));

        // Purchase intent by product
        const purchaseIntentByProduct: Record<string, { yes: number; no: number }> = {};
        trustData.forEach((r) => {
          if (r.selected_product && r.purchase_intent !== null) {
            if (!purchaseIntentByProduct[r.selected_product]) {
              purchaseIntentByProduct[r.selected_product] = { yes: 0, no: 0 };
            }
            if (r.purchase_intent) {
              purchaseIntentByProduct[r.selected_product].yes++;
            } else {
              purchaseIntentByProduct[r.selected_product].no++;
            }
          }
        });
        const purchaseIntentData = Object.entries(purchaseIntentByProduct).map(([key, value]) => ({
          product: key === 'prosound-headphones' ? 'ProSound' : key === 'audiomax-headphones' ? 'AudioMax' : 'SoundWave',
          yes: value.yes,
          no: value.no,
        }));

        return {
          productDistribution,
          avgTrustByProduct,
          purchaseIntentByProduct: purchaseIntentData,
        };
      })(),
      dopamine: {
        avgWheelSpins: dopamineData && dopamineData.length > 0
          ? dopamineData.reduce((sum, r) => sum + (r.wheel_spins || 0), 0) / dopamineData.length
          : 0,
        avgDirectClaimed: dopamineData && dopamineData.length > 0
          ? (dopamineData.filter(r => r.direct_claimed).length / dopamineData.length) * 100
          : 0,
      },
      totalResponses,
    };
  } catch (error) {
    console.error('Error fetching aggregated stats:', error);
    // Return empty stats on error
    return {
      landing: { avgStressClean: 0, avgStressCluttered: 0, cleanEasierPercent: 0 },
      gestalt: { avgTimeA: 0, avgTimeB: 0, fasterAPercent: 0 },
      schema: { easierAPercent: 0, trustworthyAPercent: 0 },
      trust: { productDistribution: [], avgTrustByProduct: [], purchaseIntentByProduct: [] },
      dopamine: { avgWheelSpins: 0, avgDirectClaimed: 0 },
      totalResponses: 0,
    };
  }
}
