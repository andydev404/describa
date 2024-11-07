const commonFeatures = [
  'Advanced style customization',
  'Commercial use of descriptions',
  'High quality description to boots your sales',
  'Support by email'
]
export const CREDIT_PACKAGES = {
  Free: {
    id: 'free',
    name: 'Free starter',
    description: 'Perfect for testing our AI capabilities',
    credits: 10,
    price: 0,
    mostPopular: false,
    features: [`10 credits`, ...commonFeatures],
    priceId: ''
  },
  Starter: {
    id: 'starter',
    name: 'Starter Pack',
    description: 'Ideal for small e-commerce stores',
    credits: 100,
    price: 9.99,
    mostPopular: false,
    features: [`100 credits`, ...commonFeatures],
    priceId: 'pri_01jbyhat1f896skmk3xxn3jdth'
  },
  Professional: {
    id: 'professional',
    name: 'Professional Pack',
    description: 'Best value for growing businesses',
    credits: 500,
    price: 49.99,
    mostPopular: true,
    features: [`500 credits`, ...commonFeatures],
    priceId: 'pri_01jbyhfvany3qh3t7803jc5j5x'
  },
  Enterprise: {
    id: 'enterprise',
    name: 'Enterprise Pack',
    description: 'Perfect for large e-commerce operations',
    credits: 1000,
    price: 89.99,
    mostPopular: false,
    features: [`1000 credits`, ...commonFeatures],
    priceId: 'pri_01jbyhgsnpqwn2zbk7c30z02js'
  }
} as const

export const INITIAL_CREDITS = 1
