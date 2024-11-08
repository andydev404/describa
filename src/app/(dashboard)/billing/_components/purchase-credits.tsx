'use client'

import { useLogSnag } from '@logsnag/next'
import { Button } from '@nextui-org/button'
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spacer,
  useDisclosure
} from '@nextui-org/react'
import { loadStripe } from '@stripe/stripe-js'
import { Check } from 'lucide-react'
import { useEffect, useState } from 'react'

import { env } from '@/app/data/env/client'
import { createCheckoutSession } from '@/features/users/actions/stripe'
import { CREDIT_PACKAGES } from '@/features/users/constants'

interface PurchaseCreditsProps {
  userId: string
  userEmail?: string
}

const stripePromise = loadStripe(env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

export const PurchaseCredits = ({
  userId,
  userEmail
}: PurchaseCreditsProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const { track } = useLogSnag()
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search)
    if (query.get('success')) {
      onOpen()
    }
  }, [])

  const handlePurchaseCredits = async (priceId: string, credits: number) => {
    try {
      setIsLoading(true)
      track({
        channel: 'billing',
        event: `Purchase Credits Started`,
        tags: {
          price_id: priceId,
          credits,
          user_email: userEmail!
        }
      })
      const { sessionId } = await createCheckoutSession({
        priceId,
        customerEmail: userEmail!,
        credits,
        userId
      })
      const stripe = await stripePromise
      await stripe?.redirectToCheckout({ sessionId })
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsLoading(false)
    }
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
          isLoading={isLoading}
          onClick={() =>
            handlePurchaseCredits(creditPackage.priceId, creditPackage.credits)
          }
          className="bg-foreground text-background"
        >
          Purchase credits
        </Button>
      </CardFooter>
    </Card>
  )

  return (
    <section className="purchase-credits">
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Payment Successful
              </ModalHeader>
              <ModalBody>
                <p>
                  Thank you for your purchase! You will receive a confirmation
                  email shortly.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={onClose}>
                  Ok
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
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
