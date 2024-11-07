import { Card, CardBody, Radio, RadioGroup, Spacer } from '@nextui-org/react'
import { useEffect, useState } from 'react'

import { FEATURES_TYPES } from '@/features/products/constants'
import { Feature, IProductDetails } from '@/features/products/types'

import type { ProductDescription } from '@/drizzle/schema'

export const useProductDetails = (
  features: Feature[],
  productDescription: ProductDescription
) => {
  const [product, setProduct] = useState<IProductDetails | null>(null)
  const [selectedLanguage, setSelectedLanguage] = useState('')
  const descriptionParsed = productDescription.description
  const languages = Object.keys(descriptionParsed)
  const featuresId = features.map(f => f.id)
  const isMultilingual = featuresId.includes(FEATURES_TYPES.MULTILINGUAL)

  useEffect(() => {
    if (isMultilingual) {
      setSelectedLanguage(languages[0])
      setProduct(
        (descriptionParsed as Record<string, IProductDetails>)[languages[0]]
      )
    } else {
      setProduct(descriptionParsed as IProductDetails)
    }
  }, [productDescription])

  const LanguageSelector = () => {
    return (
      <>
        <Card>
          <CardBody className={'flex flex-col items-center px-6'}>
            <RadioGroup
              classNames={{
                label: 'font-semibold text-default-900'
              }}
              label="Select a language"
              orientation="horizontal"
              value={selectedLanguage}
              onValueChange={language => {
                setProduct(
                  (descriptionParsed as Record<string, IProductDetails>)[
                    language
                  ]
                )
                setSelectedLanguage(language)
              }}
            >
              {languages.map(l => (
                <Radio key={l} value={l}>
                  {l}
                </Radio>
              ))}
            </RadioGroup>
          </CardBody>
        </Card>
        <Spacer y={8} />
      </>
    )
  }

  return {
    product,
    isMultilingual,
    LanguageSelector
  }
}
