import { Tag } from 'lucide-react'

import { NewCatalog } from '@/app/(dashboard)/catalogs/_components/new-catalog'

export const EmptyCatalogList = () => {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
      <div className="mb-4 rounded-full bg-default-200 p-6">
        <Tag className="size-12 text-default-400" />
      </div>
      <h2 className="mb-2 text-2xl font-semibold">Create Your First Catalog</h2>
      <p className="mb-6 max-w-md text-default-500">
        Don&#39;t have any catalogs yet? <br /> Get started by creating your
        first one.
      </p>
      <NewCatalog buttonTitle={'Create Catalog'} />
    </div>
  )
}
