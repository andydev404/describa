import { eq } from 'drizzle-orm'

import { db } from '@/drizzle/db'
import { type ApiKey, ApiKeysTable } from '@/drizzle/schema'

export async function updateApiKey(apiKey: string, data: Partial<ApiKey>) {
  await db.update(ApiKeysTable).set(data).where(eq(ApiKeysTable.apiKey, apiKey))
}
