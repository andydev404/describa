'use server'

import { auth } from '@clerk/nextjs/server'

import { deleteProductDb } from '@/features/products/db/delete-product'

export const deleteProduct = async (productId: string) => {
  const { userId } = auth()
  const errorMessage = 'There was an error deleting your product'

  if (!userId) throw new Error(errorMessage)

  await deleteProductDb(productId, userId)
}
