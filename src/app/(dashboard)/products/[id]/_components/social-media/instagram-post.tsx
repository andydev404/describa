import { useUser } from '@clerk/nextjs'
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image
} from '@nextui-org/react'
import { Bookmark, Heart, MessageCircle, Send } from 'lucide-react'

interface InstagramPostProps {
  image: string
  content: string
}

export const InstagramPost = ({ image, content }: InstagramPostProps) => {
  const { isLoaded, isSignedIn, user } = useUser()

  if (!isLoaded || !isSignedIn) {
    return null
  }

  return (
    <Card className="mx-auto max-w-[400px]">
      <CardHeader className="justify-between">
        <div className="flex gap-3">
          <Avatar src={user.imageUrl} />
          <div className="flex flex-col items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-default-600">
              {user.fullName}
            </h4>
            <h5 className="text-small tracking-tight text-default-400">
              @{user.fullName?.toLowerCase()}
            </h5>
          </div>
        </div>
      </CardHeader>
      <CardBody className="px-3 py-0">
        <Image
          alt="Card background"
          className="rounded-xl object-cover"
          src={image}
          width={400}
          height={400}
        />
      </CardBody>
      <CardFooter className="flex-col items-start px-3 py-4">
        <div className="mb-2 flex w-full justify-between">
          <div className="flex gap-2">
            <Button isIconOnly size="sm" variant="light">
              <Heart className="size-5" />
            </Button>
            <Button isIconOnly size="sm" variant="light">
              <MessageCircle className="size-5" />
            </Button>
            <Button isIconOnly size="sm" variant="light">
              <Send className="size-5" />
            </Button>
          </div>
          <Button isIconOnly size="sm" variant="light">
            <Bookmark className="size-5" />
          </Button>
        </div>
        <p className="text-small text-default-700">{content}</p>
      </CardFooter>
    </Card>
  )
}
