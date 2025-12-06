'use server';

import { supabase } from '@/lib/supabase';

export async function saveLandingResponse(data: {
  sessionId: string;
  versionShown: 'clean' | 'cluttered';
  stressRating: number;
  easierVersion?: 'clean' | 'cluttered';
}) {
  const { error } = await supabase.from('landing_responses').insert({
    session_id: data.sessionId,
    version_shown: data.versionShown,
    stress_rating: data.stressRating,
    easier_version: data.easierVersion,
  });

  if (error) {
    console.error('Error saving landing response:', error);
    throw error;
  }
}

export async function saveGestaltResponse(data: {
  sessionId: string;
  screenATime: number;
  screenBTime: number;
  fasterScreen: 'A' | 'B';
}) {
  const { error } = await supabase.from('gestalt_responses').insert({
    session_id: data.sessionId,
    screen_a_time: data.screenATime,
    screen_b_time: data.screenBTime,
    faster_screen: data.fasterScreen,
  });

  if (error) {
    console.error('Error saving gestalt response:', error);
    throw error;
  }
}

export async function saveSchemaResponse(data: {
  sessionId: string;
  easierLayout: 'A' | 'B';
  moreTrustworthyLayout: 'A' | 'B';
  hoverTimeA?: number;
  hoverTimeB?: number;
}) {
  const { error } = await supabase.from('schema_responses').insert({
    session_id: data.sessionId,
    easier_layout: data.easierLayout,
    more_trustworthy_layout: data.moreTrustworthyLayout,
    hover_time_a: data.hoverTimeA,
    hover_time_b: data.hoverTimeB,
  });

  if (error) {
    console.error('Error saving schema response:', error);
    throw error;
  }
}

export async function saveTrustResponse(data: {
  sessionId: string;
  selectedProduct: string;
  trustRating: number;
  purchaseIntent: boolean;
}) {
  const { error } = await supabase.from('trust_responses').insert({
    session_id: data.sessionId,
    selected_product: data.selectedProduct,
    trust_rating: data.trustRating,
    purchase_intent: data.purchaseIntent,
  });

  if (error) {
    console.error('Error saving trust response:', error);
    throw error;
  }
}

export async function saveDopamineResponse(data: {
  sessionId: string;
  wheelSpins: number;
  discountsReceived: string;
  directClaimed: boolean;
}) {
  const { error } = await supabase.from('dopamine_responses').insert({
    session_id: data.sessionId,
    wheel_spins: data.wheelSpins,
    discounts_received: data.discountsReceived,
    direct_claimed: data.directClaimed,
  });

  if (error) {
    console.error('Error saving dopamine response:', error);
    throw error;
  }
}
