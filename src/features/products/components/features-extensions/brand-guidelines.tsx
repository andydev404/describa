import {
  Badge,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
  useDisclosure
} from '@nextui-org/react'
import { Settings } from 'lucide-react'
import { type ChangeEvent, useEffect, useMemo, useState } from 'react'
import { useShallow } from 'zustand/react/shallow'

import { useBoundStore } from '@/app.store'
import { FEATURES_TYPES } from '@/features/products/constants'
import { Feature } from '@/features/products/types'
import { findFeatureById } from '@/features/products/utils'

export function BrandGuidelines() {
  const [guidelines, setGuidelines] = useState('')
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const { features, updateProperty } = useBoundStore(
    useShallow(state => ({
      features: state.features,
      updateProperty: state.updateProperty
    }))
  )
  const brandFeature = useMemo(
    () => findFeatureById(features, FEATURES_TYPES.BRAND),
    [features]
  )
  const guideline = brandFeature?.options || []

  useEffect(() => {
    onOpen()
  }, [])

  const handleGuidelinesChange = (e: ChangeEvent<HTMLInputElement>) => {
    setGuidelines(e.target.value)
  }

  const handleSaveGuidelines = () => {
    updateProperty(
      'features',
      features.map((feature: Feature) =>
        feature.id === FEATURES_TYPES.BRAND
          ? { ...feature, options: guidelines ? [guidelines] : [] }
          : feature
      )
    )
  }

  const handleSaveAndClose = (onClose: () => void) => {
    handleSaveGuidelines()
    onClose()
  }

  return (
    <>
      <Badge
        isInvisible={guideline.length === 0}
        content={1}
        color="danger"
        placement="top-right"
        aria-label="Brand Guidelines Settings"
      >
        <Button
          isIconOnly
          onPress={onOpen}
          size="sm"
          variant="light"
          className="absolute right-0 top-0"
          aria-label="Open Brand Guidelines"
        >
          <Settings size={16} />
        </Button>
      </Badge>

      <Modal
        backdrop="blur"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={handleSaveGuidelines}
        aria-labelledby="brand-guidelines-modal"
      >
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader
                className="flex flex-col gap-1"
                id="brand-guidelines-modal"
              >
                Brand Guidelines
              </ModalHeader>

              <ModalBody>
                <Textarea
                  variant="bordered"
                  label="Guidelines"
                  value={guidelines}
                  onChange={handleGuidelinesChange}
                  placeholder="Input your brand guidelines so Describa generates descriptions that align with your brand voice and style"
                  description='i.e. Use formal language, avoid slang, use "customers" instead of "clients"'
                  aria-label="Brand Guidelines Input"
                />
              </ModalBody>

              <ModalFooter>
                <Button
                  className="bg-foreground text-background"
                  onPress={() => handleSaveAndClose(onClose)}
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
