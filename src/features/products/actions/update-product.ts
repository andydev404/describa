'use server'

import { auth } from '@clerk/nextjs/server'

import { ERROR_TYPES } from '@/features/products/constants'
import { updateProductDb } from '@/features/products/db/update-product'

import type { Product } from '@/drizzle/schema'

export const updateProduct = async (
  productId: string,
  data: Partial<Product> & { tempCatalogId?: string }
) => {
  const { userId } = await auth()

  if (!userId) throw new Error(ERROR_TYPES.UNAUTHORIZED)

  await updateProductDb(productId, userId, data)
}
