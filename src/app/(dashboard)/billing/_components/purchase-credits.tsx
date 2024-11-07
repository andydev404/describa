'use client'

import { Button } from '@nextui-org/button'
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Divider,
  Spacer
} from '@nextui-org/react'
import { initializePaddle, Paddle, PaddleEventData } from '@paddle/paddle-js'
import { Check } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'

import { env } from '@/app/data/env/client'
import { type NewBillingHistory } from '@/drizzle/schema'
import { createBillingHistory } from '@/features/billing-history/actions/create-billing-history'
import { CREDIT_PACKAGES } from '@/features/users/constants'

interface PurchaseCreditsProps {
  userId: string
  userEmail?: string
}

interface CheckoutSettings {
  settings: {
    allowLogout: boolean
  }
}

const CHECKOUT_SETTINGS: CheckoutSettings = {
  settings: {
    allowLogout: false
  }
}

export const PurchaseCredits = ({
  userId,
  userEmail
}: PurchaseCreditsProps) => {
  const [paddle, setPaddle] = useState<Paddle | null>(null)

  const handlePaymentEvents = useCallback((data: PaddleEventData) => {
    const eventHandlers = {
      'checkout.completed': () => handleCheckoutComplete(data),
      default: () => console.log('Unhandled event:', data)
    }

    const handler =
      eventHandlers[data.name as keyof typeof eventHandlers] ||
      eventHandlers.default
    handler()
  }, [])

  useEffect(() => {
    const initPaddle = async () => {
      try {
        const paddleInstance = await initializePaddle({
          environment: env.NEXT_PUBLIC_PADDLE_ENV,
          token: env.NEXT_PUBLIC_PADDLE_KEY,
          pwCustomer: { id: userId },
          checkout: CHECKOUT_SETTINGS,
          eventCallback: handlePaymentEvents
        })

        if (paddleInstance) {
          setPaddle(paddleInstance)
        }
      } catch (error) {
        console.error('Failed to initialize Paddle:', error)
      }
    }

    initPaddle()
  }, [userId, handlePaymentEvents])

  const openCheckout = useCallback(
    async (priceId: string) => {
      if (!paddle) return

      paddle.Checkout.open({
        items: [{ priceId, quantity: 1 }],
        customer: {
          email: userEmail || ''
        }
      })
    },
    [paddle, userEmail]
  )

  const handleCheckoutComplete = async (transaction: PaddleEventData) => {
    if (!transaction.data) return
    const item = transaction.data.items[0]
    const credits =
      Object.values(CREDIT_PACKAGES).find(p => p.priceId === item.price_id)
        ?.credits || 0

    const billingData: NewBillingHistory = {
      clerkUserId: userId,
      status: transaction.data.status,
      paddleTransactionId: transaction.data.transaction_id,
      amount: String(transaction.data.totals.total),
      credits: credits
    }

    await createBillingHistory(billingData)
  }

  const renderFeature = (feature: string) => (
    <li key={feature} className="flex items-center gap-2">
      <Check className="text-primary" />
      <p className="text-default-500">{feature}</p>
    </li>
  )

  const renderCreditPackage = (
    creditPackage: (typeof CREDIT_PACKAGES)[keyof typeof CREDIT_PACKAGES]
  ) => (
    <Card key={creditPackage.id} className="relative p-3" shadow="md">
      {creditPackage.mostPopular && (
        <Chip
          classNames={{
            base: 'absolute top-5 right-4',
            content: 'font-medium text-primary-500 dark:text-primary-600'
          }}
          color="primary"
          variant="flat"
        >
          Most Popular
        </Chip>
      )}
      <CardHeader className="flex flex-col items-start gap-2 pb-6">
        <h2 className="text-large font-medium">{creditPackage.name}</h2>
        <p className="text-medium text-default-500">
          {creditPackage.description}
        </p>
      </CardHeader>
      <Divider />
      <CardBody className="mt-2">
        <div className={'flex flex-wrap items-center gap-2'}>
          <h2 className="text-3xl font-semibold">${creditPackage.price}</h2>
          {creditPackage.id !== 'free' && <p>one-time payment</p>}
        </div>
        <Spacer y={3} />
        <ul className="flex flex-col gap-2">
          {creditPackage.features?.map(renderFeature)}
        </ul>
      </CardBody>
      <CardFooter>
        <Button
          fullWidth
          onClick={() => openCheckout(creditPackage.priceId)}
          className="bg-foreground text-background"
        >
          Purchase credits
        </Button>
      </CardFooter>
    </Card>
  )

  return (
    <section className="purchase-credits">
      <h2 className="text-xl font-semibold">Purchase Credits</h2>
      <p className="text-small text-default-500">
        Boost your sales by purchasing credits easily!
      </p>
      <Spacer y={4} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Object.values(CREDIT_PACKAGES).slice(1).map(renderCreditPackage)}
      </div>
    </section>
  )
}
