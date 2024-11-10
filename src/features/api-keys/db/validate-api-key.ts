import { db } from '@/drizzle/db'

export function validateApiKeyDb(apiKey: string) {
  return db.query.ApiKeysTable.findFirst({
    where: ({ apiKey, isActive }, { eq, and }) =>
      and(eq(apiKey, apiKey), eq(isActive, true)),
    with: {
      user: true
    }
  })
}
