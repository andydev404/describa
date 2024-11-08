'use client'

import { useLogSnag } from '@logsnag/next'
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@nextui-org/react'
import { Sparkles } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { useShallow } from 'zustand/react/shallow'

import { TotalCostLabel } from '@/app/(dashboard)/products/new/_components/total-cost-label'
import { useBoundStore } from '@/app.store'
import { reGenerateDescription } from '@/features/products/actions/re-generate-description'
import { cn } from '@/lib/utils'

type Props = {
  productId: string
  creditsCost: number
}

export const ReGenerateDescription = ({ productId, creditsCost }: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const { updateProperty, creatingProduct } = useBoundStore(
    useShallow(state => ({
      creatingProduct: state.creatingProduct,
      updateProperty: state.updateProperty
    }))
  )
  const { track } = useLogSnag()

  useEffect(() => {
    updateProperty('creatingProduct', false)
  }, [])

  const handleReGenerateDescription = async () => {
    setIsOpen(false)
    updateProperty('creatingProduct', true)
    track({
      channel: 'products',
      event: `Description Re-Generation Started`,
      tags: {
        product: productId,
        credits: creditsCost
      }
    })
    try {
      await reGenerateDescription(productId)
      toast.success('Description generated successfully')
    } catch (error) {
      toast.error(
        (error as { message: string }).message ||
          'Failed to generate description'
      )
    } finally {
      updateProperty('creatingProduct', false)
    }
  }
  return (
    <Popover
      placement="left-start"
      isOpen={isOpen}
      onOpenChange={open => setIsOpen(open)}
      backdrop={'opaque'}
      showArrow
    >
      <PopoverTrigger>
        <Button
          size="sm"
          isLoading={creatingProduct}
          className={cn('bg-foreground text-background')}
          startContent={<Sparkles size={16} />}
        >
          Re-generate Description
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="px-1 py-2">
          <div className="text-small font-bold">
            Are you sure you want to re-generate the description?
          </div>
          <div className="flex gap-3 pt-4">
            <TotalCostLabel totalCreditsCost={creditsCost} />
            <Button
              size="sm"
              className={cn('bg-foreground text-background')}
              isLoading={creatingProduct}
              startContent={<Sparkles size={12} />}
              onPress={handleReGenerateDescription}
            >
              Re-generate Description
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
