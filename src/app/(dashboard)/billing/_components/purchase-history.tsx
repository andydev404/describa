import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

import { BillingHistoryTable } from '@/app/(dashboard)/billing/_components/billing-history-table'
import { getBillingHistory } from '@/features/billing-history/db/get-billing-history'

export const PurchaseHistory = async () => {
  const { userId } = auth()

  if (!userId) redirect('/')

  const history = await getBillingHistory(userId)

  return <BillingHistoryTable history={history} />
}
