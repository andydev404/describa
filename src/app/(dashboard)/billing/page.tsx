import { auth, currentUser } from '@clerk/nextjs/server'
import { Spacer } from '@nextui-org/react'
import { redirect } from 'next/navigation'

import { CreditBalance } from '@/app/(dashboard)/billing/_components/credit-balance'
import { PurchaseCredits } from '@/app/(dashboard)/billing/_components/purchase-credits'
import { PurchaseHistory } from '@/app/(dashboard)/billing/_components/purchase-history'

const BillingPage = async () => {
  const { userId } = auth()

  if (!userId) redirect('/')

  const user = await currentUser()

  if (!user) redirect('/')
  return (
    <>
      <header className="my-6 flex w-full items-center justify-between">
        <div className="flex flex-col">
          <h1 className="text-xl font-bold text-default-900 lg:text-3xl">
            Billing & Credits
          </h1>
          <p className="text-small text-default-500 lg:text-medium">
            Track your purchases and remaining credits here
          </p>
        </div>
      </header>
      <CreditBalance userId={userId} />
      <PurchaseCredits
        userId={userId}
        userEmail={user?.primaryEmailAddress?.emailAddress}
      />
      <Spacer y={8} />
      <PurchaseHistory />
    </>
  )
}

export default BillingPage
