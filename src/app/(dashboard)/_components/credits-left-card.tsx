import { Button } from '@nextui-org/button'
import { Card, CardBody, Progress } from '@nextui-org/react'
import Link from 'next/link'

import { cn } from '@/lib/utils'

type Props = {
  credits: number
}

export const CreditsLeftCard = ({ credits }: Props) => {
  const maxCredits = 100
  const percentage = (credits / maxCredits) * 100
  return (
    <Card className="mx-2 w-full overflow-visible" shadow="sm">
      <CardBody className="py-5">
        <div className={cn('mb-2 flex items-center justify-between gap-2')}>
          <h3 className="text-small font-medium">Credits left</h3>
          <h2 className={'font-semibold'}>{credits}</h2>
        </div>
        <Progress value={percentage} size={'sm'} className={'min-w-full'} />
        <Button
          as={Link}
          href={'/billing'}
          size={'sm'}
          variant={'flat'}
          className={'mt-4'}
        >
          Buy credits
        </Button>
      </CardBody>
    </Card>
  )
}
