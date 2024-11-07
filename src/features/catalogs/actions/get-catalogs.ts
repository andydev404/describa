'use server'

import { auth } from '@clerk/nextjs/server'

import { getCatalogsDb } from '@/features/catalogs/db/get-catalogs'
import { ERROR_TYPES } from '@/features/products/constants'

export const getCatalogs = async () => {
  const { userId } = auth()

  if (!userId) throw new Error(ERROR_TYPES.UNAUTHORIZED)

  return await getCatalogsDb(userId)
}
