import { Card, CardBody, CardHeader } from '@nextui-org/react'
import { Zap } from 'lucide-react'

import { getUser } from '@/features/users/db/get-user'

type Props = {
  userId: string
}
export const CreditBalance = async ({ userId }: Props) => {
  const user = await getUser(userId)
  return (
    <Card className="mb-8 max-w-md px-4">
      <CardHeader>
        <h1 className={'text-large font-semibold'}>Credit Balance</h1>
      </CardHeader>
      <CardBody>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-3xl font-bold">{user?.currentCredits}</p>
            <p className="text-sm text-gray-500">Available Credits</p>
          </div>
          <Zap className="size-8 text-blue-500" />
        </div>
      </CardBody>
    </Card>
  )
}
