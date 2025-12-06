export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  averageRating: number;
  reviewCount: number;
  description: string;
  image: string;
  reviews: Review[];
}

export const products: Product[] = [
  {
    id: 'headphones',
    name: 'ProSound Wireless Headphones',
    price: 169.99,
    averageRating: 4.8,
    reviewCount: 2450,
    description: 'High-quality wireless headphones with noise cancellation and premium sound quality.',
    image: '🎧',
    reviews: [
      {
        id: '1',
        author: 'Sarah M.',
        rating: 5,
        date: '2 days ago',
        comment: 'Absolutely amazing! The sound quality is incredible and the noise cancellation works perfectly. Best purchase I\'ve made this year.',
        verified: true,
      },
      {
        id: '2',
        author: 'Michael T.',
        rating: 5,
        date: '1 week ago',
        comment: 'These headphones exceeded my expectations. Comfortable for long listening sessions and the battery life is outstanding.',
        verified: true,
      },
      {
        id: '3',
        author: 'Jessica L.',
        rating: 5,
        date: '2 weeks ago',
        comment: 'Perfect for my daily commute. The noise cancellation blocks out everything and the sound is crystal clear.',
        verified: true,
      },
      {
        id: '4',
        author: 'David K.',
        rating: 5,
        date: '3 weeks ago',
        comment: 'Worth every penny! The build quality is excellent and they feel premium. Highly recommend.',
        verified: true,
      },
      {
        id: '5',
        author: 'Emily R.',
        rating: 4,
        date: '1 month ago',
        comment: 'Great headphones overall. The only minor issue is the case could be a bit smaller, but sound quality is top-notch.',
        verified: true,
      },
      {
        id: '6',
        author: 'Robert P.',
        rating: 5,
        date: '1 month ago',
        comment: 'I\'ve tried many headphones and these are by far the best. The comfort and sound quality are unmatched.',
        verified: true,
      },
    ],
  },
  {
    id: 'earbuds',
    name: 'AudioMax Wireless Headphones',
    price: 159.99,
    averageRating: 4.7,
    reviewCount: 3,
    description: 'Premium wireless headphones with active noise cancellation and long battery life.',
    image: '🎧',
    reviews: [
      {
        id: '1',
        author: 'Alex B.',
        rating: 5,
        date: '5 days ago',
        comment: 'Incredible sound quality! The noise cancellation is amazing and they\'re super comfortable. Best headphones I\'ve owned.',
        verified: true,
      },
      {
        id: '2',
        author: 'Maria G.',
        rating: 5,
        date: '1 week ago',
        comment: 'Absolutely love these! The battery lasts forever and the sound is crystal clear. Highly recommend to anyone looking for quality headphones.',
        verified: true,
      },
      {
        id: '3',
        author: 'John H.',
        rating: 4,
        date: '2 weeks ago',
        comment: 'Great headphones overall. The sound quality is excellent and they look really stylish. Only minor complaint is the case is a bit bulky.',
        verified: true,
      },
    ],
  },
  {
    id: 'speaker',
    name: 'Waveline Wireless Headphones',
    price: 174.99,
    averageRating: 3.2,
    reviewCount: 320,
    description: 'Wireless headphones with Bluetooth connectivity and built-in microphone.',
    image: '🎧',
    reviews: [
      {
        id: '1',
        author: 'Chris D.',
        rating: 3,
        date: '4 days ago',
        comment: 'They work okay but nothing special. The sound quality is decent for the price, though the build feels a bit cheap.',
        verified: true,
      },
      {
        id: '2',
        author: 'Amanda K.',
        rating: 3,
        date: '1 week ago',
        comment: 'Average headphones. The sound is okay at lower volumes but gets a bit distorted when you turn it up. Not bad, not great.',
        verified: true,
      },
      {
        id: '3',
        author: 'Kevin M.',
        rating: 3,
        date: '2 weeks ago',
        comment: 'Battery life could be better - lasts about 4 hours. The build quality is fine but nothing premium. Does the job.',
        verified: true,
      },
      {
        id: '4',
        author: 'Nicole P.',
        rating: 2,
        date: '3 weeks ago',
        comment: 'Had some connectivity issues initially. They work now but the Bluetooth connection can be spotty sometimes.',
        verified: true,
      },
      {
        id: '5',
        author: 'Brian L.',
        rating: 4,
        date: '1 month ago',
        comment: 'For the price, these are pretty good. Sound quality is acceptable and they\'re comfortable to wear. No major complaints.',
        verified: true,
      },
      {
        id: '6',
        author: 'Stephanie N.',
        rating: 3,
        date: '1 month ago',
        comment: 'They\'re fine for casual use. The volume could be louder and sometimes there\'s a bit of static, but overall acceptable.',
        verified: true,
      },
    ],
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}
