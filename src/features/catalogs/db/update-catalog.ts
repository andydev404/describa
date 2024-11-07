import { eq } from 'drizzle-orm'

import { db } from '@/drizzle/db'
import { Catalog, CatalogsTable } from '@/drizzle/schema'
import { CACHE_TAGS, revalidateDbCache } from '@/lib/cache'

export async function updateCatalogDb(
  catalogId: string,
  userId: string,
  data: Partial<Catalog>
) {
  await db
    .update(CatalogsTable)
    .set(data)
    .where(eq(CatalogsTable.clerkUserId, userId))

  revalidateDbCache({
    tag: CACHE_TAGS.catalogs,
    userId: userId,
    id: catalogId
  })
}
