'use client'

import { useLogSnag } from '@logsnag/next'
import { Card, CardBody, CardHeader, Divider, Spacer } from '@nextui-org/react'
import { useShallow } from 'zustand/react/shallow'

import { useBoundStore } from '@/app.store'
import { FeatureSwitch } from '@/features/products/components/feature-switch'
import { LanguageSelector } from '@/features/products/components/language-selector'
import {
  FEATURES,
  LANGUAGE_OPTIONS,
  TONE_OPTIONS
} from '@/features/products/constants'
import { Feature } from '@/features/products/types'

export const AdvancedFeatures = () => {
  const { updateProperty, features, language, tone } = useBoundStore(
    useShallow(state => ({
      features: state.features,
      updateProperty: state.updateProperty,
      language: state.language,
      tone: state.tone
    }))
  )
  const { track } = useLogSnag()
  const featuresIds = features.map(feature => feature.id)

  const handleFeatureSwitchChange = (
    featureId: string,
    value: boolean,
    feature: Feature
  ) => {
    let tempFeatures = [...features]
    if (value) {
      tempFeatures = tempFeatures.concat(feature)
    } else {
      tempFeatures = tempFeatures.filter(feature => feature.id !== featureId)
    }

    updateProperty('features', tempFeatures)
  }

  return (
    <Card className="p-2 shadow-small">
      <CardHeader className="flex flex-col items-start px-4 pb-0 pt-4">
        <h2 className="text-large font-medium">Features</h2>
      </CardHeader>
      <CardBody>
        <div className="grid grid-cols-2 gap-4">
          <LanguageSelector
            value={language}
            onValueChange={value => {
              track({
                channel: 'products',
                event: `Main language selected`,
                tags: {
                  language: value
                }
              })
              updateProperty('language', value)
              updateProperty(
                'features',
                features.map(f =>
                  f.id === 'multilingual'
                    ? {
                        ...f,
                        options: f?.options?.filter(opt => opt !== value) || []
                      }
                    : f
                )
              )
            }}
            options={LANGUAGE_OPTIONS}
            label="Language"
          />
          <LanguageSelector
            value={tone}
            onValueChange={value => {
              track({
                channel: 'products',
                event: `Tone selected`,
                tags: {
                  tone: value
                }
              })
              updateProperty('tone', value)
            }}
            options={TONE_OPTIONS}
            label="Tone"
          />
        </div>

        <Divider className="my-6" />

        <div className="mb-4">
          <h2 className="font-medium">Advanced</h2>
          <p className="text-small text-default-500">Boost your sales!</p>
        </div>

        <Spacer y={4} />

        <div className="grid grid-cols-2 gap-2">
          {FEATURES.map(feature => (
            <FeatureSwitch
              key={feature.id}
              isSelected={featuresIds.includes(feature.id)}
              onValueChange={value => {
                track({
                  channel: 'products',
                  event: `Advance feature clicked`,
                  tags: {
                    active: value,
                    feature: feature.label
                  }
                })
                handleFeatureSwitchChange(feature.id, value, feature)
              }}
              {...feature}
            />
          ))}
        </div>
      </CardBody>
    </Card>
  )
}
