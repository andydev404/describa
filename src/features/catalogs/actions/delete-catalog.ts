'use server'

import { auth } from '@clerk/nextjs/server'

import { deleteCatalogDb } from '@/features/catalogs/db/delete-catalog'
import { ERROR_TYPES } from '@/features/products/constants'

export const deleteCatalog = async (catalogId: string) => {
  const { userId } = await auth()

  if (!userId) throw new Error(ERROR_TYPES.UNAUTHORIZED)

  await deleteCatalogDb(catalogId, userId)
}
