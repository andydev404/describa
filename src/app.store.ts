import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

import {
  productCreationSlice,
  ProductCreationState
} from '@/features/products/store/use-product-creation'

export const useBoundStore = create<ProductCreationState>()(
  devtools((...a) => ({
    ...productCreationSlice(...a)
  }))
)
