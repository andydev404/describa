import { RedirectToSignIn } from '@clerk/nextjs'
import { auth } from '@clerk/nextjs/server'
import { Card, CardBody, CardHeader, Spacer } from '@nextui-org/react'

import { LastProducts } from '@/app/(dashboard)/dashboard/_components/last-products'
import { LastPurchases } from '@/app/(dashboard)/dashboard/_components/last-purchases'
import { getBillingHistory } from '@/features/billing-history/db/get-billing-history'
import { getDescriptionsGeneratedBetweenDates } from '@/features/products/db/get-descriptions-generated-between-dates'
import { getLastProducts } from '@/features/products/db/get-last-products'
import { getProducts } from '@/features/products/db/get-products'
import { getUser } from '@/features/users/db/get-user'

const DashboardPage = async () => {
  const { userId } = await auth()
  if (!userId) {
    return <RedirectToSignIn />
  }

  // Time Saved per Product = 15 minutes - 0.17 minutes (10 seconds) = 14.83 minutes or 0.247 hours
  const minsInHours = 0.247
  const user = await getUser(userId)
  const productsThisWeek = await getDescriptionsGeneratedBetweenDates(userId)
  const products = await getProducts(userId)
  const lastProducts = await getLastProducts(userId, 5, 'Dashboard')
  const history = await getBillingHistory(userId)
  return (
    <>
      <div className="mt-6 flex items-center gap-x-3">
        <h1 className="text-3xl font-bold leading-9 text-default-foreground">
          Your AI-Powered Control Center
        </h1>
      </div>
      <p className="mb-8 mt-2 text-small text-default-500">
        Manage your product descriptions, track performance, and scale your
        business
      </p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
        <Card classNames={{ base: 'p-4' }}>
          <CardHeader className={'pb-0'}>
            <h2 className="text-xs font-medium uppercase tracking-wide text-default-500">
              Credits remaining
            </h2>
          </CardHeader>
          <CardBody>
            <h3 className="text-xl font-medium sm:text-2xl">
              {user?.currentCredits}
            </h3>
          </CardBody>
        </Card>

        <Card classNames={{ base: 'p-4' }}>
          <CardHeader className={'pb-0'}>
            <p className="text-xs font-medium uppercase tracking-wide text-default-500">
              Descriptions generated this week
            </p>
          </CardHeader>
          <CardBody>
            <h3 className="text-xl font-medium sm:text-2xl">
              {productsThisWeek.length}
            </h3>
          </CardBody>
        </Card>

        <Card classNames={{ base: 'p-4' }}>
          <CardHeader className={'pb-0'}>
            <p className="text-xs font-medium uppercase tracking-wide text-default-500">
              Active products
            </p>
          </CardHeader>
          <CardBody>
            <h3 className="text-xl font-medium sm:text-2xl">
              {products.length}
            </h3>
          </CardBody>
        </Card>

        <Card classNames={{ base: 'p-4 bg-foreground text-background' }}>
          <CardHeader className={'pb-0'}>
            <p className="text-xs font-medium uppercase tracking-wide">
              Time saved
            </p>
          </CardHeader>
          <CardBody>
            <h3 className="text-xl font-medium sm:text-2xl">
              {(products.length * minsInHours).toFixed(1)} hours
            </h3>
          </CardBody>
        </Card>
      </div>
      <Spacer y={8} />
      <LastProducts products={lastProducts} />
      <Spacer y={8} />
      <LastPurchases history={history.slice(0, 5)} />
    </>
  )
}

export default DashboardPage
