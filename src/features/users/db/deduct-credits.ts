import { eq } from 'drizzle-orm'

import { db } from '@/drizzle/db'
import { UsersTable } from '@/drizzle/schema'
import { CACHE_TAGS, revalidateDbCache } from '@/lib/cache'

export async function deductCredits(userId: string, currentCredits: number) {
  await db
    .update(UsersTable)
    .set({
      currentCredits,
      updatedAt: new Date()
    })
    .where(eq(UsersTable.clerkUserId, userId))

  revalidateDbCache({
    tag: CACHE_TAGS.user,
    userId
  })
}
