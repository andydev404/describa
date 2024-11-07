import { FEATURES_TYPES } from '@/features/products/constants'

export interface Feature {
  id: FeatureType
  label: string
  description: string
  defaultSelected?: boolean
  creditCost: number
  options?: string[]
}

export interface LanguageOption {
  id: string
  label: string
  value: string
}

export type AdvanceFeatureType = 'Tone' | 'Language' | 'Features'

export type FeatureType = (typeof FEATURES_TYPES)[keyof typeof FEATURES_TYPES]

export type ProductImageType =
  | 'image/jpeg'
  | 'image/png'
  | 'image/gif'
  | 'image/webp'

export interface IProductDetails {
  title: string
  description: string
  key_features: string[]
  email_marketing?: {
    subject_line: string
    body: string
  }
  social_media?: {
    facebook: string
    instagram: string
  }
  performance_indicators?: {
    effectiveness_factors: string[]
    conversion_elements: string[]
  }
}

export interface IProductRequestBody {
  tone: string
  language: string
  features: Feature[]
  images: File[]
}
