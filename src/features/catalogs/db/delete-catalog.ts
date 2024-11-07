import { and, eq } from 'drizzle-orm'

import { db } from '@/drizzle/db'
import { CatalogsTable } from '@/drizzle/schema'
import { CACHE_TAGS, revalidateDbCache } from '@/lib/cache'

export async function deleteCatalogDb(catalogId: string, userId: string) {
  await db
    .delete(CatalogsTable)
    .where(
      and(
        eq(CatalogsTable.id, catalogId),
        eq(CatalogsTable.clerkUserId, userId)
      )
    )

  revalidateDbCache({
    tag: CACHE_TAGS.catalogs,
    userId: userId,
    id: catalogId
  })
}
