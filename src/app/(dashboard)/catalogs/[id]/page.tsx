import { redirect } from 'next/navigation'

import { DeleteCatalog } from '@/app/(dashboard)/catalogs/[id]/_components/catalog-actions/delete-catalog'
import { EditCatalog } from '@/app/(dashboard)/catalogs/[id]/_components/catalog-actions/edit-catalog'
import { getCatalog } from '@/features/catalogs/db/get-catalog'
import { EmptyProductList } from '@/features/products/components/empty-product-list'
import { ProductCard } from '@/features/products/components/product-card'
import { cn } from '@/lib/utils'

const CatalogDetailsPage = async ({ params }: { params: { id: string } }) => {
  const catalog = await getCatalog(params.id)

  if (!catalog) redirect('/catalogs')

  return (
    <div>
      <div className={'mb-7 flex items-center gap-5 border-b pb-2'}>
        <h1 className={cn('flex-1 text-xl font-medium')}>
          Products: <span className={'font-semibold'}>{catalog.title}</span>
        </h1>
        <DeleteCatalog catalogId={params.id} />
        <EditCatalog initialValue={catalog.title} catalogId={params.id} />
      </div>
      {catalog.products.length === 0 && <EmptyProductList />}
      <div
        className={
          'grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4'
        }
      >
        {catalog.products.map(product => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  )
}

export default CatalogDetailsPage
