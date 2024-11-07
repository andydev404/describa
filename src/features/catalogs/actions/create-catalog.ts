'use server'

import { auth } from '@clerk/nextjs/server'

import { createCatalogDb } from '@/features/catalogs/db/create-catalog'

export const createCatalog = async (title: string) => {
  const { userId } = auth()
  const errorMessage = 'There was an error creating your catalog'

  if (!userId) throw new Error(errorMessage)

  if (!title) throw new Error('Please enter a title')

  await createCatalogDb({ title, clerkUserId: userId })
}
