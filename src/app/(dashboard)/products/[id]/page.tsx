import { Card } from '@nextui-org/react'
import { redirect } from 'next/navigation'

import { DeleteProduct } from '@/app/(dashboard)/products/[id]/_components/description-actions/delete-product'
import { ReGenerateDescription } from '@/app/(dashboard)/products/[id]/_components/description-actions/re-generate-description'
import { SelectCatalog } from '@/app/(dashboard)/products/[id]/_components/description-actions/select-catalog'
import { ProductDetails } from '@/app/(dashboard)/products/[id]/_components/product-details'
import { getCatalogs } from '@/features/catalogs/actions/get-catalogs'
import { getProductDetails } from '@/features/products/db/get-product-details'
import { cn } from '@/lib/utils'

const ProductDescriptionPage = async ({
  params
}: {
  params: { id: string }
}) => {
  const productData = await getProductDetails(params.id)
  const catalogs = await getCatalogs()

  if (!productData) redirect('/products')

  return (
    <>
      <div className="mb-4 flex justify-end gap-4">
        <DeleteProduct productId={params.id} />
        <ReGenerateDescription
          productId={params.id}
          creditsCost={productData.productDescription.creditsCost}
        />
      </div>
      <Card className="flex min-h-full w-full flex-col items-center px-8 pb-8 shadow-small">
        <div className={'relative mb-8 w-full border-b py-6'}>
          <h1 className={cn('text-center text-xl font-bold lg:text-3xl')}>
            Product details
          </h1>
          {catalogs.length > 0 && (
            <div className={'right-0 top-4 w-60 lg:absolute'}>
              <SelectCatalog
                catalogId={productData.catalogId || ''}
                catalogs={catalogs}
                productId={params.id}
              />
            </div>
          )}
        </div>
        <ProductDetails {...productData} />
      </Card>
    </>
  )
}

export default ProductDescriptionPage
