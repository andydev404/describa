import { Feature } from '@/features/products/types'

// Defining string literal types specifically for language and tone options
export type Language =
  | 'en'
  | 'zh'
  | 'es'
  | 'ar'
  | 'hi'
  | 'ja'
  | 'de'
  | 'fr'
  | 'pt'
  | 'ru'
export type Tone =
  | 'professional'
  | 'conversational'
  | 'enthusiastic'
  | 'technical'
  | 'empathetic'
  | 'educational'
  | 'persuasive'
  | 'casual'

// Defining the LanguageOption type, ensuring id and value are of type Language or Tone
export type TypedLanguageOption<T> = {
  id: T
  label: string
  value: T
}

export const LANGUAGE_OPTIONS: TypedLanguageOption<Language>[] = [
  {
    id: 'en',
    label: 'English',
    value: 'en'
  },
  {
    id: 'zh',
    label: 'Chinese (Simplified)',
    value: 'zh'
  },
  {
    id: 'es',
    label: 'Spanish',
    value: 'es'
  },
  {
    id: 'ar',
    label: 'Arabic',
    value: 'ar'
  },
  {
    id: 'hi',
    label: 'Hindi',
    value: 'hi'
  },
  {
    id: 'ja',
    label: 'Japanese',
    value: 'ja'
  },
  {
    id: 'de',
    label: 'German',
    value: 'de'
  },
  {
    id: 'fr',
    label: 'French',
    value: 'fr'
  },
  {
    id: 'pt',
    label: 'Portuguese',
    value: 'pt'
  },
  {
    id: 'ru',
    label: 'Russian',
    value: 'ru'
  }
]

export const TONE_OPTIONS: TypedLanguageOption<Tone>[] = [
  {
    id: 'professional',
    label: 'Professional',
    value: 'professional'
  },
  {
    id: 'conversational',
    label: 'Conversational',
    value: 'conversational'
  },
  {
    id: 'enthusiastic',
    label: 'Enthusiastic',
    value: 'enthusiastic'
  },
  {
    id: 'technical',
    label: 'Technical',
    value: 'technical'
  },
  {
    id: 'empathetic',
    label: 'Empathetic',
    value: 'empathetic'
  },
  {
    id: 'educational',
    label: 'Educational',
    value: 'educational'
  },
  {
    id: 'persuasive',
    label: 'Persuasive',
    value: 'persuasive'
  },
  {
    id: 'casual',
    label: 'Casual',
    value: 'casual'
  }
]

export const FEATURES: Feature[] = [
  {
    id: 'multilingual',
    label: 'Multilingual Support',
    description: 'Generate descriptions in multiple languages',
    creditCost: 1
  },
  {
    id: 'keywords',
    label: 'Keyword Integration',
    description: 'Include specific keywords in your descriptions',
    creditCost: 1
  },
  {
    id: 'email',
    label: 'Email Template',
    description: 'Targeted email template to boost engagement',
    defaultSelected: true,
    creditCost: 1
  },
  {
    id: 'social',
    label: 'Social Media Integration',
    description: 'Engage your followers with platform-optimized content',
    creditCost: 1
  },
  {
    id: 'brand',
    label: 'Brand Guidelines Compliance',
    description: 'Input brand guidelines for aligned descriptions',
    defaultSelected: true,
    creditCost: 1
  },
  {
    id: 'analytics',
    label: 'Analytics and Insights',
    description: "Gain valuable feedback on your content's performance",
    creditCost: 1
  }
]

export const FEATURES_TYPES = {
  MULTILINGUAL: 'multilingual',
  KEYWORDS: 'keywords',
  EMAIL: 'email',
  SOCIAL: 'social',
  BRAND: 'brand',
  ANALYTICS: 'analytics'
} as const

export const ERROR_TYPES = {
  UNAUTHORIZED: 'User authentication required',
  USER_NOT_FOUND: 'User account not found',
  INSUFFICIENT_CREDITS: 'Insufficient credits',
  IMAGE_UPLOAD_FAILED: 'Failed to upload images',
  DESCRIPTION_GENERATION_FAILED: 'Failed to generate description'
} as const
