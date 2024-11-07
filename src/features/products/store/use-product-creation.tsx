import { StateCreator } from 'zustand'

import { Feature } from '@/features/products/types'

export interface ProductCreationState {
  tone: string
  language: string
  creatingProduct: boolean
  features: Feature[]
  images: File[]
  updateProperty: <
    K extends keyof Omit<ProductCreationState, 'updateProductProperty'>
  >(
    key: K,
    value: ProductCreationState[K]
  ) => void
}

const defaultTone = 'professional'
const defaultLanguage = 'en'

export const productCreationSlice: StateCreator<
  ProductCreationState
> = set => ({
  tone: defaultTone,
  language: defaultLanguage,
  creatingProduct: false,
  features: [],
  images: [],
  updateProperty: (key, value) => set(state => ({ ...state, [key]: value }))
})
