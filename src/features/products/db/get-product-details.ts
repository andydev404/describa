import { and } from 'drizzle-orm'

import { db } from '@/drizzle/db'
import { CACHE_TAGS, dbCache, getIdTag } from '@/lib/cache'

export function getProductDetails(productId: string) {
  const cacheFn = dbCache(getProductInternal, {
    tags: [getIdTag(productId, CACHE_TAGS.products)]
  })
  return cacheFn(productId)
}

function getProductInternal(productId: string) {
  return db.query.ProductsTable.findFirst({
    where: ({ id, isActive }, { eq }) =>
      and(eq(id, productId), eq(isActive, true)),
    with: {
      productDescription: true
    }
  })
}
