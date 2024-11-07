import { db } from '@/drizzle/db'
import { BillingHistoryTable, type NewBillingHistory } from '@/drizzle/schema'
import { addCredits } from '@/features/users/db/add-credits'
import { CACHE_TAGS, revalidateDbCache } from '@/lib/cache'

export async function CreateBillingHistoryDb(data: NewBillingHistory) {
  const [newBillingHistory] = await db
    .insert(BillingHistoryTable)
    .values(data)
    .returning({
      id: BillingHistoryTable.id,
      userId: BillingHistoryTable.clerkUserId
    })

  await addCredits(data.clerkUserId, data.credits)

  revalidateDbCache({
    tag: CACHE_TAGS.billing,
    userId: newBillingHistory.userId
  })

  return newBillingHistory
}
