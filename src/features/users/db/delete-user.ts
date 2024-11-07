import { eq } from 'drizzle-orm'

import { db } from '@/drizzle/db'
import { UsersTable } from '@/drizzle/schema'
import { CACHE_TAGS, revalidateDbCache } from '@/lib/cache'

export async function deleteUser(clerkUserId: string) {
  const [deletedUser] = await db
    .delete(UsersTable)
    .where(eq(UsersTable.clerkUserId, clerkUserId))
    .returning({
      id: UsersTable.id
    })

  revalidateDbCache({
    tag: CACHE_TAGS.user,
    id: deletedUser.id,
    userId: clerkUserId
  })

  return deletedUser
}
