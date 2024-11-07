import { Button, Link } from '@nextui-org/react'
import { Package2, Plus } from 'lucide-react'

export const EmptyProductList = () => {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
      <div className="mb-4 rounded-full bg-default-200 p-6">
        <Package2 className="size-12 text-default-400" />
      </div>
      <h2 className="mb-2 text-2xl font-semibold">No products yet</h2>
      <p className="mb-6 max-w-md text-default-500">
        Get started by adding your first product. Your products will appear here
        once you&apos;ve added them.
      </p>
      <Button
        as={Link}
        href="/products/new"
        className="bg-foreground text-background"
        startContent={
          <Plus size={16} className="flex-none text-background/60" />
        }
      >
        Add product
      </Button>
    </div>
  )
}
