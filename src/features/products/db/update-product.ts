import { and, eq } from 'drizzle-orm'
import { revalidatePath, revalidateTag } from 'next/cache'

import { db } from '@/drizzle/db'
import { type Product, ProductsTable } from '@/drizzle/schema'
import {
  CACHE_TAGS,
  getUserLastProductsTag,
  revalidateDbCache
} from '@/lib/cache'

export async function updateProductDb(
  productId: string,
  userId: string,
  data: Partial<Product> & { tempCatalogId?: string }
) {
  await db
    .update(ProductsTable)
    .set(data)
    .where(
      and(
        eq(ProductsTable.id, productId),
        eq(ProductsTable.clerkUserId, userId)
      )
    )

  revalidateDbCache({
    tag: CACHE_TAGS.products,
    userId,
    id: productId
  })

  if (data.title) {
    revalidateTag(getUserLastProductsTag(userId, 'Dashboard'))
  }

  if (Object.keys(data).includes('catalogId')) {
    revalidateDbCache({
      tag: CACHE_TAGS.catalogs,
      userId: userId
    })

    if (data.tempCatalogId) {
      revalidatePath(`/catalogs/${data.tempCatalogId}`)
    }
  }
}
