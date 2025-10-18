export const plans = [
  {
    id: 'basic',
    name: 'Basic',
    basePrice: 99,
    features: [
      '10 GB Storage',
      'Basic Support',
      '5 Users',
      'Monthly Reports'
    ]
  },
  {
    id: 'standard',
    name: 'Standard',
    basePrice: 199,
    features: [
      '50 GB Storage',
      'Priority Support',
      '20 Users',
      'Weekly Reports',
      'API Access'
    ]
  },
  {
    id: 'premium',
    name: 'Premium',
    basePrice: 399,
    features: [
      'Unlimited Storage',
      '24/7 Premium Support',
      'Unlimited Users',
      'Real-time Reports',
      'API Access',
      'Custom Integrations'
    ]
  }
];

export const durations = [
  { years: 1, discount: 0 },
  { years: 3, discount: 0.1 },
  { years: 6, discount: 0.15 },
  { years: 9, discount: 0.2 }
];
