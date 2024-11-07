import { eq } from 'drizzle-orm'

import { db } from '@/drizzle/db'
import { ProductsTable } from '@/drizzle/schema'
import { CACHE_TAGS, dbCache, getIdTag } from '@/lib/cache'

export function getCatalog(catalogId: string) {
  const cacheFn = dbCache(getCatalogInternal, {
    tags: [getIdTag(catalogId, CACHE_TAGS.catalogs)]
  })
  return cacheFn(catalogId)
}

function getCatalogInternal(catalogId: string) {
  return db.query.CatalogsTable.findFirst({
    where: ({ id }, { eq }) => eq(id, catalogId),
    with: {
      products: {
        where: eq(ProductsTable.isActive, true)
      }
    }
  })
}
