import { db } from '@/drizzle/db'
import { ProductDescriptionsTable } from '@/drizzle/schema'
import { IProductDetails } from '@/features/products/types'
import { CACHE_TAGS, revalidateDbCache } from '@/lib/cache'

export async function updateProductDescription(
  productId: string,
  userId: string,
  description: IProductDetails | Record<string, IProductDetails>
) {
  await db.update(ProductDescriptionsTable).set({
    description,
    updatedAt: new Date()
  })

  revalidateDbCache({
    tag: CACHE_TAGS.products,
    userId,
    id: productId
  })
}
