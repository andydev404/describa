import {
  Badge,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure
} from '@nextui-org/react'
import { Settings } from 'lucide-react'
import { useEffect } from 'react'
import { useShallow } from 'zustand/react/shallow'

import { useBoundStore } from '@/app.store'
import { KeywordInput } from '@/features/products/components/features-extensions/keywords-selection/keyword-input'
import { KeywordsList } from '@/features/products/components/features-extensions/keywords-selection/keywords-list'
import { useKeywords } from '@/features/products/hooks/use-keywords'

export function KeywordsSelection() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const { features, updateProperty } = useBoundStore(
    useShallow(state => ({
      features: state.features,
      updateProperty: state.updateProperty
    }))
  )

  const {
    inputValue,
    keywordsList,
    handleInputChange,
    handleAddKeyword,
    handleDeleteKeyword,
    handleKeyPress
  } = useKeywords(features, updateProperty)

  useEffect(() => {
    onOpen()
  }, [])

  return (
    <>
      <Badge
        isInvisible={keywordsList.length === 0}
        content={keywordsList.length}
        color="danger"
        placement="top-right"
      >
        <Button
          isIconOnly
          onPress={onOpen}
          size="sm"
          variant="light"
          className="absolute right-0 top-0"
        >
          <Settings size={16} />
        </Button>
      </Badge>

      <Modal
        onClose={handleAddKeyword}
        backdrop="blur"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Keywords Integration
              </ModalHeader>
              <ModalBody>
                <KeywordInput
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyPress}
                  onAdd={handleAddKeyword}
                />
                <KeywordsList
                  keywords={keywordsList}
                  onDelete={handleDeleteKeyword}
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  className="bg-foreground text-background"
                  onPress={onClose}
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
