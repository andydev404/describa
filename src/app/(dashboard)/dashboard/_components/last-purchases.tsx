'use client'

import { BillingHistoryTable } from '@/app/(dashboard)/billing/_components/billing-history-table'

import type { BillingHistory } from '@/drizzle/schema'

type Props = {
  history: BillingHistory[]
}

export const LastPurchases = ({ history }: Props) => {
  return (
    <>
      <h2 className={'mb-4 font-semibold'}>Recent credit purchases</h2>
      <BillingHistoryTable hideTitle history={history} />
    </>
  )
}
