import { Badge } from '@nextui-org/react'
import { useShallow } from 'zustand/react/shallow'

import { SwitchCell } from '@/app/(dashboard)/_components/switch-cell'
import { useBoundStore } from '@/app.store'
import { BrandGuidelines } from '@/features/products/components/features-extensions/brand-guidelines'
import { KeywordsSelection } from '@/features/products/components/features-extensions/keywords-selection'
import { MultilingualSelection } from '@/features/products/components/features-extensions/multilingual-selection'
import { FEATURES_TYPES } from '@/features/products/constants'
import { Feature } from '@/features/products/types'

interface FeatureSwitchProps extends Feature {
  onValueChange: (isSelected: boolean) => void
  isSelected: boolean
}

export const FeatureSwitch = ({
  label,
  description,
  defaultSelected,
  creditCost,
  onValueChange,
  isSelected,
  id
}: FeatureSwitchProps) => {
  const { features } = useBoundStore(
    useShallow(state => ({
      features: state.features
    }))
  )

  const feature = features.find(f => f.id === id)
  const adjustedCreditCost =
    feature &&
    [
      FEATURES_TYPES.MULTILINGUAL.toString(),
      FEATURES_TYPES.BRAND.toString(),
      FEATURES_TYPES.KEYWORDS.toString()
    ].includes(id)
      ? feature.options?.length || 0
      : creditCost

  const renderSettingsButton = () => {
    switch (id) {
      case FEATURES_TYPES.MULTILINGUAL:
        return (
          <MultilingualSelection resetStatus={() => onValueChange(false)} />
        )
      case FEATURES_TYPES.KEYWORDS:
        return <KeywordsSelection resetStatus={() => onValueChange(false)} />
      case FEATURES_TYPES.BRAND:
        return <BrandGuidelines resetStatus={() => onValueChange(false)} />
      default:
        return null
    }
  }

  return (
    <Badge
      isInvisible={!isSelected || adjustedCreditCost === 0}
      content={`${adjustedCreditCost} credit`}
      size="sm"
      color="primary"
      placement="top-left"
    >
      <SwitchCell
        defaultSelected={defaultSelected}
        description={description}
        label={label}
        color="foreground"
        isSelected={isSelected}
        onValueChange={onValueChange}
      />
      {isSelected && renderSettingsButton()}
    </Badge>
  )
}
