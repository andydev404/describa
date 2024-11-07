import { db } from '@/drizzle/db'
import { type NewUser, UsersTable } from '@/drizzle/schema'
import { CACHE_TAGS, revalidateDbCache } from '@/lib/cache'

export async function CreateUserDb(data: NewUser) {
  const [newUser] = await db
    .insert(UsersTable)
    .values(data)
    .onConflictDoNothing({
      target: UsersTable.clerkUserId
    })
    .returning({
      id: UsersTable.id,
      userId: UsersTable.clerkUserId
    })

  revalidateDbCache({
    tag: CACHE_TAGS.user,
    userId: newUser.userId,
    id: newUser.id
  })

  return newUser
}
