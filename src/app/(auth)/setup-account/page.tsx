'use client'

import { Card, CardBody, Spacer, Spinner } from '@nextui-org/react'
import { Text } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { toast } from 'sonner'

import { createUser } from '@/features/users/actions/create-user'

const SetupAccountPage = () => {
  const router = useRouter()
  useEffect(() => {
    ;(async () => {
      const userResponse = await createUser()
      if (userResponse.success) {
        router.push('/dashboard')
      } else {
        toast.error(userResponse.error)
        router.push('/')
      }
    })()
  }, [])

  return (
    <div
      className={
        'flex min-h-screen w-full flex-col items-center justify-center bg-foreground'
      }
    >
      <Text size={48} className={'text-background'} />
      <Spacer y={6} />
      <Card
        classNames={{
          base: 'p-8'
        }}
      >
        <CardBody>
          <Spinner color={'default'} size={'lg'} />
          <Spacer y={4} />
          <h2 className={'text-xl font-semibold'}>
            Setting up your account...
          </h2>
        </CardBody>
      </Card>
    </div>
  )
}

export default SetupAccountPage
