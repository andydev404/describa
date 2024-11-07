import { Image } from '@nextui-org/react'

import { useBoundStore } from '@/app.store'

export const HeaderPage = () => {
  const creatingProduct = useBoundStore(state => state.creatingProduct)
  return (
    <>
      <header className="my-6 flex w-full items-center justify-between">
        <div className="flex flex-col">
          <h1 className="text-xl font-bold text-default-900 lg:text-3xl">
            New Product
          </h1>
        </div>
      </header>
      {!creatingProduct && (
        <>
          <Image
            src="/woman.svg"
            width={190}
            removeWrapper
            className="mx-auto"
            alt="Upload product image"
          />
          <h2 className="text-center text-xl font-semibold">
            Start Crafting Perfect Product Descriptions!
          </h2>
          <h3 className="mx-auto mt-1 max-w-lg text-center text-sm text-default-500">
            Upload an image, select from a variety of options to enhance your
            description, and let our AI take care of the rest!
          </h3>
        </>
      )}
    </>
  )
}
