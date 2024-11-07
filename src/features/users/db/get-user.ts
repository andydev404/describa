import { db } from '@/drizzle/db'
import { CACHE_TAGS, dbCache, getUserTag } from '@/lib/cache'

export function getUser(userId: string) {
  const cacheFn = dbCache(getUserSubscriptionInternal, {
    tags: [getUserTag(userId, CACHE_TAGS.user)]
  })
  return cacheFn(userId)
}

function getUserSubscriptionInternal(userId: string) {
  return db.query.UsersTable.findFirst({
    where: ({ clerkUserId }, { eq }) => eq(clerkUserId, userId)
  })
}
