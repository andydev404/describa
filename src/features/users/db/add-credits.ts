import { eq, sql } from 'drizzle-orm'

import { db } from '@/drizzle/db'
import { UsersTable } from '@/drizzle/schema'
import { CACHE_TAGS, revalidateDbCache } from '@/lib/cache'

export async function addCredits(userId: string, credits: number) {
  await db
    .update(UsersTable)
    .set({
      currentCredits: sql`current_credits +
      ${credits}`,
      updatedAt: new Date()
    })
    .where(eq(UsersTable.clerkUserId, userId))

  revalidateDbCache({
    tag: CACHE_TAGS.user,
    userId
  })
}
