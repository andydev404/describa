import { and } from 'drizzle-orm'

import { db } from '@/drizzle/db'
import { CACHE_TAGS, dbCache, getUserTag } from '@/lib/cache'

export function getProducts(userId: string) {
  const cacheFn = dbCache(getProductsInternal, {
    tags: [getUserTag(userId, CACHE_TAGS.products)]
  })
  return cacheFn(userId)
}

function getProductsInternal(userId: string) {
  return db.query.ProductsTable.findMany({
    where: ({ clerkUserId, isActive }, { eq }) =>
      and(eq(clerkUserId, userId), eq(isActive, true)),
    orderBy: ({ createdAt }, { desc }) => desc(createdAt),
    with: {
      productDescription: true
    }
  })
}
