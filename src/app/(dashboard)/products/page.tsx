import { auth } from '@clerk/nextjs/server'
import { Button, Link } from '@nextui-org/react'
import { Plus } from 'lucide-react'
import { redirect } from 'next/navigation'

import { EmptyProductList } from '@/features/products/components/empty-product-list'
import { ProductCard } from '@/features/products/components/product-card'
import { getProducts } from '@/features/products/db/get-products'

const ProductsPage = async () => {
  const { userId } = await auth()

  if (!userId) redirect('/')

  const products = await getProducts(userId)

  return (
    <>
      <header className="my-6 flex w-full flex-wrap items-center justify-between gap-3">
        <div className="flex flex-col">
          <h1 className="text-xl font-bold text-default-900 lg:text-3xl">
            Products
          </h1>
          <p className="text-small text-default-500 lg:text-medium">
            Create and manage your product listings here!
          </p>
        </div>
        <Button
          as={Link}
          href="/products/new"
          className="bg-foreground text-background"
          startContent={
            <Plus size={16} className="flex-none text-background/60" />
          }
        >
          New Product
        </Button>
      </header>
      {products.length === 0 && <EmptyProductList />}
      <div
        className={
          'grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4'
        }
      >
        {products.map(product => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </>
  )
}

export default ProductsPage
