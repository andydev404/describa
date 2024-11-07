'use server'

import { auth } from '@clerk/nextjs/server'

import { updateCatalogDb } from '@/features/catalogs/db/update-catalog'
import { ERROR_TYPES } from '@/features/products/constants'

import type { Catalog } from '@/drizzle/schema'

export const updateCatalog = async (
  catalogId: string,
  data: Partial<Catalog>
) => {
  const { userId } = auth()

  if (!userId) throw new Error(ERROR_TYPES.UNAUTHORIZED)

  await updateCatalogDb(catalogId, userId, data)
}
