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
import { Plus } from 'lucide-react'
import { KeyboardEvent, useState, useTransition } from 'react'
import { toast } from 'sonner'

import { createCatalog } from '@/features/catalogs/actions/create-catalog'
import { cn } from '@/lib/utils'

type Props = {
  buttonTitle?: string
}

export const NewCatalog = ({ buttonTitle = 'New Catalog' }: Props) => {
  const [isPending, setTransition] = useTransition()
  const [title, setTitle] = useState('')
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const { track } = useLogSnag()

  const handleCreateCatalog = () => {
    if (!title) return
    track({
      channel: 'catalogs',
      event: `New Catalog Created`,
      tags: {
        title: title
      }
    })
    setTransition(async () => {
      try {
        await createCatalog(title)
        toast.success('Catalog created successfully')
      } catch (error) {
        toast.error((error as { message: string }).message)
      } finally {
        setTitle('')
        onClose()
      }
    })
  }

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleCreateCatalog()
    }
  }

  return (
    <>
      <Button
        onPress={onOpen}
        className="bg-foreground text-background"
        startContent={
          <Plus size={16} className="flex-none text-background/60" />
        }
      >
        {buttonTitle}
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                New Catalog
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
                  onPress={handleCreateCatalog}
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
