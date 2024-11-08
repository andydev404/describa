'use client'

import { useLogSnag } from '@logsnag/next'
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Spacer
} from '@nextui-org/react'
import { Trash } from 'lucide-react'
import { useRouter } from 'nextjs-toploader/app'
import { useTransition } from 'react'

import { deleteProduct } from '@/features/products/actions/delete-product'

type Props = {
  productId: string
}

export const DeleteProduct = ({ productId }: Props) => {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const { track } = useLogSnag()

  const handleDelete = () => {
    track({
      channel: 'products',
      event: `Product deleted`,
      tags: {
        product: productId
      }
    })
    startTransition(async () => {
      await deleteProduct(productId)
      router.replace('/products')
    })
  }
  return (
    <Popover placement="bottom" backdrop={'opaque'} showArrow={true}>
      <PopoverTrigger>
        <Button
          size="sm"
          variant={'light'}
          disabled={isPending}
          startContent={<Trash size={16} />}
        >
          Delete product
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="px-1 py-2">
          <div className="text-small font-bold">
            Are you sure you want to delete the product?
          </div>
          <div className="text-tiny">This action cannot be undone</div>
          <Spacer y={2} />
          <Button
            size="sm"
            color={'danger'}
            isLoading={isPending}
            onPress={handleDelete}
          >
            Delete product
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
