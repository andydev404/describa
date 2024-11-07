import { and, eq } from 'drizzle-orm'
import { revalidatePath, revalidateTag } from 'next/cache'

import { db } from '@/drizzle/db'
import { ProductsTable } from '@/drizzle/schema'
import {
  CACHE_TAGS,
  getUserLastProductsTag,
  revalidateDbCache
} from '@/lib/cache'

export async function deleteProductDb(productId: string, userId: string) {
  const [updatedProduct] = await db
    .update(ProductsTable)
    .set({
      isActive: false
    })
    .where(
      and(
        eq(ProductsTable.id, productId),
        eq(ProductsTable.clerkUserId, userId)
      )
    )
    .returning({
      catalogId: ProductsTable.catalogId
    })

  revalidateDbCache({
    tag: CACHE_TAGS.products,
    userId,
    id: productId
  })

  revalidateDbCache({
    tag: CACHE_TAGS.catalogs,
    userId
  })

  revalidateTag(getUserLastProductsTag(userId, 'Dashboard'))

  if (updatedProduct.catalogId) {
    revalidatePath(`/catalogs/${updatedProduct.catalogId}`)
  }
}
