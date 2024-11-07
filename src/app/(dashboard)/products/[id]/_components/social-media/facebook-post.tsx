import { useUser } from '@clerk/nextjs'
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Image
} from '@nextui-org/react'
import { MoreHorizontal } from 'lucide-react'

interface FacebookPostProps {
  image: string
  content: string
}

export const FacebookPost = ({ image, content }: FacebookPostProps) => {
  const { isLoaded, isSignedIn, user } = useUser()

  if (!isLoaded || !isSignedIn) {
    return null
  }

  return (
    <Card className="mx-auto max-w-[600px]">
      <CardHeader className="justify-between">
        <div className="flex gap-3">
          <Avatar src={user.imageUrl} />
          <div className="flex flex-col items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-default-600">
              {user.fullName}
            </h4>
            <h5 className="text-small tracking-tight text-default-400">
              2 hours ago
            </h5>
          </div>
        </div>
        <Button isIconOnly variant="light">
          <MoreHorizontal className="size-6" />
        </Button>
      </CardHeader>
      <Divider className={'bg-default-100'} />
      <CardBody className="px-3 py-4 text-small">
        <p>{content}</p>
        <Image
          alt="Scenic mountain view"
          className="mt-3 rounded-xl object-cover"
          src={image}
          width={600}
          height={300}
        />
      </CardBody>
    </Card>
  )
}
