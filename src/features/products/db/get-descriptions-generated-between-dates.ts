import { and, eq, sql } from 'drizzle-orm'

import { db } from '@/drizzle/db'
import { ProductDescriptionsTable, ProductsTable } from '@/drizzle/schema'
import { getStartAndEndWeekISO } from '@/features/products/utils'
import { dbCache, getUserProductsBetweenDatesTag } from '@/lib/cache'

export function getDescriptionsGeneratedBetweenDates(userId: string) {
  const { startOfWeekISO, endOfWeekISO } = getStartAndEndWeekISO()
  const cacheFn = dbCache(getProductsDescriptionInternal, {
    tags: [getUserProductsBetweenDatesTag(userId, startOfWeekISO, endOfWeekISO)]
  })
  return cacheFn(userId, startOfWeekISO, endOfWeekISO)
}

function getProductsDescriptionInternal(
  userId: string,
  startOfWeekISO: string,
  endOfWeekISO: string
) {
  return db
    .select()
    .from(ProductDescriptionsTable)
    .leftJoin(
      ProductsTable,
      eq(ProductDescriptionsTable.productId, ProductsTable.id)
    )
    .where(
      and(
        sql`${ProductDescriptionsTable.createdAt} BETWEEN
        ${startOfWeekISO}
        AND
        ${endOfWeekISO}`,
        eq(ProductsTable.isActive, true),
        eq(ProductsTable.clerkUserId, userId)
      )
    )
}
