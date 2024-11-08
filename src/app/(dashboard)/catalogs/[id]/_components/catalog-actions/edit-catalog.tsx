'use client'

import { useLogSnag } from '@logsnag/next'
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure
} from '@nextui-org/react'
import { Pen } from 'lucide-react'
import { KeyboardEvent, useState, useTransition } from 'react'
import { toast } from 'sonner'

import { updateCatalog } from '@/features/catalogs/actions/update-catalog'
import { cn } from '@/lib/utils'

type Props = {
  catalogId: string
  initialValue: string
}

export const EditCatalog = ({ initialValue, catalogId }: Props) => {
  const [isPending, setTransition] = useTransition()
  const [title, setTitle] = useState(initialValue)
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const { track } = useLogSnag()

  const handleEditCatalog = () => {
    if (!title) return
    track({
      channel: 'catalogs',
      event: `Catalog Edited`,
      tags: {
        catalog: catalogId,
        before: initialValue,
        after: title
      }
    })
    setTransition(async () => {
      try {
        await updateCatalog(catalogId, { title })
        toast.success('Catalog updated successfully')
      } catch (error) {
        toast.error((error as { message: string }).message)
      } finally {
        onClose()
      }
    })
  }

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleEditCatalog()
    }
  }

  return (
    <>
      <Button
        onPress={onOpen}
        size={'sm'}
        className="bg-foreground text-background"
        startContent={
          <Pen size={16} className="flex-none text-background/60" />
        }
      >
        Edit Catalog
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Edit Catalog
              </ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  label="Name"
                  onKeyDown={handleKeyPress}
                  value={title}
                  onValueChange={value => setTitle(value)}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant={'light'} onPress={onClose}>
                  Close
                </Button>
                <Button
                  disabled={!title}
                  isLoading={isPending}
                  className={cn('bg-foreground text-background', {
                    'pointer-events-none opacity-50': !title
                  })}
                  onPress={handleEditCatalog}
                >
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
