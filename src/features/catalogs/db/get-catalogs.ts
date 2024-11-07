import { eq } from 'drizzle-orm'

import { db } from '@/drizzle/db'
import { ProductsTable } from '@/drizzle/schema'
import { CACHE_TAGS, dbCache, getUserTag } from '@/lib/cache'

export function getCatalogsDb(userId: string) {
  const cacheFn = dbCache(getCatalogsInternal, {
    tags: [getUserTag(userId, CACHE_TAGS.catalogs)]
  })
  return cacheFn(userId)
}

function getCatalogsInternal(userId: string) {
  return db.query.CatalogsTable.findMany({
    where: ({ clerkUserId }, { eq }) => eq(clerkUserId, userId),
    orderBy: ({ createdAt }, { desc }) => desc(createdAt),
    with: {
      products: {
        where: eq(ProductsTable.isActive, true)
      }
    }
  })
}
