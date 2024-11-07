import { useUser } from '@clerk/nextjs'
import { Avatar, Button, Card, CardBody, CardHeader } from '@nextui-org/react'
import { MoreHorizontal, Star } from 'lucide-react'

import { TextWithLineBreaks } from '@/app/(dashboard)/_components/text-with-line-breaks'

type Props = {
  subject: string
  body: string
}

export const EmailTemplate = ({ subject, body }: Props) => {
  const { isLoaded, isSignedIn, user } = useUser()

  if (!isLoaded || !isSignedIn) {
    return null
  }

  return (
    <Card className="mx-auto max-w-[600px] p-4">
      <CardHeader className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar isBordered radius="full" size="md" src={user.imageUrl} />
          <div className="flex flex-col items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-default-600">
              {user.fullName}
            </h4>
            <h5 className="text-small tracking-tight text-default-400">
              {user.primaryEmailAddress?.emailAddress}
            </h5>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button isIconOnly variant="light" aria-label="Star email">
            <Star className="size-4" />
          </Button>
          <Button isIconOnly variant="light" aria-label="More options">
            <MoreHorizontal className="size-4" />
          </Button>
        </div>
      </CardHeader>
      <CardBody className="py-2">
        <h2 className="mb-2 text-large font-bold">{subject}</h2>
        <p className="mb-4 text-default-500">
          <TextWithLineBreaks text={body} />
        </p>
      </CardBody>
    </Card>
  )
}
