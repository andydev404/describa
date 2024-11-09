'use client'
import { Spacer, Spinner } from '@nextui-org/react'
import dynamic from 'next/dynamic'
import { useShallow } from 'zustand/react/shallow'

import { AiLoading } from '@/app/(dashboard)/_components/ai-loading'
import { MachineTextAnimation } from '@/app/(dashboard)/_components/machine-text-animation'
import { FooterPage } from '@/app/(dashboard)/products/new/_components/footer-page'
import { HeaderPage } from '@/app/(dashboard)/products/new/_components/header-page'
import { useBoundStore } from '@/app.store'
import { AdvancedFeatures } from '@/features/products/components/advanced-features'

const ImageUploader = dynamic(() => import('@/features/image-uploader'), {
  ssr: false,
  loading: () => (
    <div className={'flex flex-col items-center'}>
      <Spinner color="default" />
    </div>
  )
})

const NewProductPage = () => {
  const { updateProperty, creatingProduct } = useBoundStore(
    useShallow(state => ({
      creatingProduct: state.creatingProduct,
      updateProperty: state.updateProperty
    }))
  )

  return (
    <>
      <HeaderPage />
      <Spacer y={creatingProduct ? 24 : 6} />
      {creatingProduct ? (
        <div className={'flex flex-col items-center space-y-6'}>
          <MachineTextAnimation
            value={'Crafting the description... Thank you for your patience.'}
          />
          <AiLoading />
        </div>
      ) : (
        <div className="mx-auto max-w-2xl">
          <ImageUploader
            onFilesChange={files => updateProperty('images', files)}
          />
          <Spacer y={6} />
          <AdvancedFeatures />
          <Spacer y={6} />
          <FooterPage />
        </div>
      )}
    </>
  )
}

export default NewProductPage
