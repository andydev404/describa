import { useLogSnag } from '@logsnag/next'
import { Button } from '@nextui-org/react'
import { Sparkles } from 'lucide-react'
import { toast } from 'sonner'
import { useShallow } from 'zustand/react/shallow'

import { TotalCostLabel } from '@/app/(dashboard)/products/new/_components/total-cost-label'
import { useBoundStore } from '@/app.store'
import { calculateTotalCredits } from '@/features/products/utils'
import { INITIAL_CREDITS } from '@/features/users/constants'
import { cn } from '@/lib/utils'

export const FooterPage = () => {
  const { features, images, tone, language, updateProperty, creatingProduct } =
    useBoundStore(
      useShallow(state => ({
        tone: state.tone,
        language: state.language,
        features: state.features,
        creatingProduct: state.creatingProduct,
        updateProperty: state.updateProperty,
        images: state.images
      }))
    )
  const totalCreditsCost = calculateTotalCredits(features, INITIAL_CREDITS)
  const { track } = useLogSnag()
  const generateProductDescription = async () => {
    const formData = new FormData()
    formData.append('tone', tone)
    formData.append('language', language)
    formData.append('features', JSON.stringify(features))
    images.forEach(file => {
      formData.append('images', file)
    })

    updateProperty('creatingProduct', true)

    track({
      channel: 'products',
      event: `Description Generation Started`,
      tags: {
        tone,
        language,
        features: JSON.stringify(features)
      }
    })

    const response = await fetch('/api/v1/product-description', {
      method: 'POST',
      body: formData
    })

    const data = await response.json()

    if (!response.ok) {
      toast.error(data.error || 'Failed to generate description')
      updateProperty('creatingProduct', false)
      return
    }

    window.location.href = `/products/${data.productId}`
  }

  return (
    <div className="flex w-full flex-col lg:flex-row justify-end gap-2">
      <TotalCostLabel totalCreditsCost={totalCreditsCost} />
      <Button
        onClick={generateProductDescription}
        disabled={images.length === 0}
        isLoading={creatingProduct}
        className={cn('bg-foreground text-background', {
          'pointer-events-none opacity-50': images.length === 0
        })}
        startContent={<Sparkles size={16} />}
      >
        Generate Description
      </Button>
    </div>
  )
}
