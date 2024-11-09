import { ChangeEvent, KeyboardEvent, useState } from 'react'

import { FEATURES_TYPES } from '@/features/products/constants'
import { ProductCreationState } from '@/features/products/store/use-product-creation'
import { Feature } from '@/features/products/types'

export const useKeywords = (
  features: Feature[],
  updateProperty: ProductCreationState['updateProperty']
) => {
  const [inputValue, setInputValue] = useState('')

  const keywordsFeature = features.find(
    feature => feature.id === FEATURES_TYPES.KEYWORDS
  )
  const keywordsList = keywordsFeature?.options || []

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const filteredValue = e.target.value.replace(/[^a-zA-Z0-9\s]/g, '')
    setInputValue(filteredValue.trim())
  }

  const handleAddKeyword = () => {
    if (!inputValue || keywordsList.includes(inputValue)) {
      return
    }

    updateProperty(
      'features',
      features.map(feature =>
        feature.id === FEATURES_TYPES.KEYWORDS
          ? { ...feature, options: [...keywordsList, inputValue] }
          : feature
      )
    )
    setInputValue('')
  }

  const handleDeleteKeyword = (keywordToDelete: string) => {
    updateProperty(
      'features',
      features.map(feature =>
        feature.id === FEATURES_TYPES.KEYWORDS
          ? {
              ...feature,
              options: keywordsList.filter(
                keyword => keyword !== keywordToDelete
              )
            }
          : feature
      )
    )
  }

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddKeyword()
    }
  }

  return {
    inputValue,
    keywordsList,
    handleInputChange,
    handleAddKeyword,
    handleDeleteKeyword,
    handleKeyPress
  }
}
