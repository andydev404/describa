import { NewCatalog } from '@/app/(dashboard)/catalogs/_components/new-catalog'
import { getCatalogs } from '@/features/catalogs/actions/get-catalogs'
import { CatalogCard } from '@/features/catalogs/components/catalog-card'

import { EmptyCatalogList } from './_components/empty-catalog-list'

const CatalogsPage = async () => {
  const catalogs = await getCatalogs()
  return (
    <>
      <header className="my-6 flex w-full flex-wrap items-center justify-between gap-3">
        <div className="flex flex-col">
          <h1 className="text-xl font-bold text-default-900 lg:text-3xl">
            Catalogs
          </h1>
          <p className="text-small text-default-500 lg:text-medium">
            Organize your product listings into logical groups for easy browsing
            and management
          </p>
        </div>
        <NewCatalog />
      </header>
      {catalogs.length === 0 && <EmptyCatalogList />}
      <div
        className={
          'grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4'
        }
      >
        {catalogs.map(catalog => (
          <CatalogCard key={catalog.id} {...catalog} />
        ))}
      </div>
    </>
  )
}

export default CatalogsPage
