import { eq } from 'drizzle-orm'

import { db } from '@/drizzle/db'
import { type NewUser, UsersTable } from '@/drizzle/schema'
import { CACHE_TAGS, revalidateDbCache } from '@/lib/cache'

export async function updateUser(userId: string, data: Partial<NewUser>) {
  const [updatedUser] = await db
    .update(UsersTable)
    .set(data)
    .where(eq(UsersTable.clerkUserId, userId))
    .returning({
      id: UsersTable.id,
      userId: UsersTable.clerkUserId
    })

  if (updatedUser != null) {
    revalidateDbCache({
      tag: CACHE_TAGS.user,
      userId: updatedUser.userId,
      id: updatedUser.id
    })
  }
}
