import { db } from '@/drizzle/db'
import { ApiKeysTable, type NewApiKey } from '@/drizzle/schema'

export async function createApiKey(data: NewApiKey) {
  const [inssertedApiKey] = await db
    .insert(ApiKeysTable)
    .values(data)
    .returning({
      id: ApiKeysTable.id,
      apiKey: ApiKeysTable.apiKey,
      userId: ApiKeysTable.clerkUserId
    })

  return inssertedApiKey
}
