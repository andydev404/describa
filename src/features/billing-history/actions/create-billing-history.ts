'use server'

import { auth } from '@clerk/nextjs/server'

import { CreateBillingHistoryDb } from '@/features/billing-history/db/create-billing-history'
import { ERROR_TYPES } from '@/features/products/constants'

import type { NewBillingHistory } from '@/drizzle/schema'

export const createBillingHistory = async (data: NewBillingHistory) => {
  const { userId } = auth()

  if (!userId) throw new Error(ERROR_TYPES.UNAUTHORIZED)

  await CreateBillingHistoryDb(data)
}
