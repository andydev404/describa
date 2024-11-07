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
import { Check } from 'lucide-react'
import Link from 'next/link'

import { CREDIT_PACKAGES } from '@/features/users/constants'

export const Pricing = () => {
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
          as={Link}
          href={creditPackage.id === 'free' ? '/products/new' : '/billing'}
          fullWidth
          className="bg-foreground text-background"
        >
          {creditPackage.id === 'free' ? 'Get Started' : 'Purchase credits'}
        </Button>
      </CardFooter>
    </Card>
  )
  return (
    <div
      className={'mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8'}
      id={'pricing'}
    >
      <div className="mx-auto mb-16 max-w-2xl sm:text-center">
        <p className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-foreground sm:text-balance sm:text-5xl">
          Simple Pricing, Powerful Results
        </p>
        <p className="mt-6 text-lg/8 text-default-500">
          Choose the perfect package for your business - start free, scale as
          you grow
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Object.values(CREDIT_PACKAGES).map(renderCreditPackage)}
      </div>
    </div>
  )
}
