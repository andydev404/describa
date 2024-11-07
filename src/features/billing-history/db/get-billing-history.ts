import { db } from '@/drizzle/db'
import { CACHE_TAGS, dbCache, getUserTag } from '@/lib/cache'

export function getBillingHistory(userId: string) {
  const cacheFn = dbCache(getBillingHistoryInternal, {
    tags: [getUserTag(userId, CACHE_TAGS.billing)]
  })
  return cacheFn(userId)
}

function getBillingHistoryInternal(userId: string) {
  return db.query.BillingHistoryTable.findMany({
    where: ({ clerkUserId }, { eq }) => eq(clerkUserId, userId)
  })
}
