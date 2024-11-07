import { and } from 'drizzle-orm'

import { db } from '@/drizzle/db'
import { dbCache, getUserLastProductsTag } from '@/lib/cache'

export function getLastProducts(
  userId: string,
  limit = 5,
  location: 'Dashboard' | 'Billing'
) {
  const cacheFn = dbCache(getProductsInternal, {
    tags: [getUserLastProductsTag(userId, location)]
  })
  return cacheFn(userId, limit)
}

function getProductsInternal(userId: string, limit: number) {
  return db.query.ProductsTable.findMany({
    where: ({ clerkUserId, isActive }, { eq }) =>
      and(eq(clerkUserId, userId), eq(isActive, true)),
    orderBy: ({ createdAt }, { desc }) => desc(createdAt),
    with: {
      productDescription: true
    },
    limit
  })
}
