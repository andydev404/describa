import { db } from '@/drizzle/db'
import { CatalogsTable, type NewCatalog, ProductsTable } from '@/drizzle/schema'
import { CACHE_TAGS, revalidateDbCache } from '@/lib/cache'

export async function createCatalogDb(data: NewCatalog) {
  const [insertedCatalog] = await db
    .insert(CatalogsTable)
    .values(data)
    .returning({
      id: ProductsTable.id,
      userId: ProductsTable.clerkUserId
    })

  revalidateDbCache({
    tag: CACHE_TAGS.catalogs,
    userId: insertedCatalog.userId,
    id: insertedCatalog.id
  })
}
