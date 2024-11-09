import {
  Badge,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  useDisclosure
} from '@nextui-org/react'
import { Settings } from 'lucide-react'
import React, { useCallback, useEffect, useMemo } from 'react'
import { useShallow } from 'zustand/react/shallow'

import { useBoundStore } from '@/app.store'
import { FEATURES_TYPES, LANGUAGE_OPTIONS } from '@/features/products/constants'
import {
  extractOptionsFromValue,
  findFeatureById
} from '@/features/products/utils'

type Props = {
  resetStatus: () => void
}

export function MultilingualSelection({ resetStatus }: Props) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const { features, updateProperty, language } = useBoundStore(
    useShallow(state => ({
      features: state.features,
      language: state.language,
      updateProperty: state.updateProperty
    }))
  )

  const multilingualFeature = useMemo(
    () => findFeatureById(features, FEATURES_TYPES.MULTILINGUAL),
    [features]
  )
  const selectedLanguages = multilingualFeature?.options || []
  const availableLanguages = useMemo(
    () => LANGUAGE_OPTIONS.filter(option => option.id !== language),
    [language]
  )

  useEffect(() => {
    onOpen()
  }, [])

  const handleSelectionChange = useCallback(
    (value: string) => {
      const languages = extractOptionsFromValue(value)
      updateProperty(
        'features',
        features.map(feature =>
          feature.id === FEATURES_TYPES.MULTILINGUAL
            ? { ...feature, options: languages }
            : feature
        )
      )
    },
    [features, updateProperty]
  )

  return (
    <>
      <Badge
        isInvisible={!selectedLanguages?.length}
        content={selectedLanguages?.length}
        color="danger"
        placement="top-right"
      >
        <Button
          isIconOnly
          onPress={onOpen}
          size={'sm'}
          variant={'light'}
          className={'absolute right-0 top-0'}
        >
          <Settings size={16} />
        </Button>
      </Badge>
      <Modal
        backdrop={'blur'}
        onClose={() => {
          if (selectedLanguages.length === 0) {
            resetStatus()
          }
        }}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Multilingual Support
              </ModalHeader>
              <ModalBody>
                <Select
                  label="Languages selection"
                  selectionMode="multiple"
                  placeholder="Select one or more languages"
                  selectedKeys={new Set(selectedLanguages)}
                  onChange={e => handleSelectionChange(e.target.value)}
                >
                  {availableLanguages.map(option => (
                    <SelectItem key={option.id} value={option.id}>
                      {option.label}
                    </SelectItem>
                  ))}
                </Select>
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
