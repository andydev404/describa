import { eq } from 'drizzle-orm'
import { revalidateTag } from 'next/cache'

import { db } from '@/drizzle/db'
import {
  type NewProduct,
  ProductDescriptionsTable,
  ProductsTable
} from '@/drizzle/schema'
import { IProductDetails } from '@/features/products/types'
import {
  CACHE_TAGS,
  getUserLastProductsTag,
  revalidateDbCache
} from '@/lib/cache'

export async function createProductWithDescription(
  data: NewProduct,
  description: IProductDetails | Record<string, IProductDetails>,
  creditCost: {
    totalCreditCost: number
    inputTokens: number
    outputTokens: number
  }
) {
  const [insertedProduct] = await db
    .insert(ProductsTable)
    .values(data)
    .returning({
      id: ProductsTable.id,
      userId: ProductsTable.clerkUserId
    })

  try {
    await db.insert(ProductDescriptionsTable).values({
      productId: insertedProduct.id,
      description,
      creditsCost: creditCost.totalCreditCost,
      inputTokens: creditCost.inputTokens,
      outputTokens: creditCost.outputTokens
    })

    revalidateDbCache({
      tag: CACHE_TAGS.products,
      id: insertedProduct.id,
      userId: insertedProduct.userId
    })

    revalidateTag(getUserLastProductsTag(insertedProduct.userId, 'Dashboard'))
  } catch {
    await db
      .delete(ProductsTable)
      .where(eq(ProductsTable.id, insertedProduct.id))
  }

  return insertedProduct
}
