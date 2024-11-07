'use client'

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

import { deleteCatalog } from '@/features/catalogs/actions/delete-catalog'

type Props = {
  catalogId: string
}

export const DeleteCatalog = ({ catalogId }: Props) => {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const handleDelete = () => {
    startTransition(async () => {
      await deleteCatalog(catalogId)
      router.replace('/catalogs')
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
          Delete catalog
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="px-1 py-2">
          <div className="text-small font-bold">
            Are you sure you want to delete the catalog?
          </div>
          <div className="text-tiny">This action cannot be undone</div>
          <Spacer y={2} />
          <Button
            size="sm"
            color={'danger'}
            isLoading={isPending}
            onPress={handleDelete}
          >
            Delete catalog
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
