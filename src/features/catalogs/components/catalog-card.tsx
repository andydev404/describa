import { Card, CardBody, Chip, Image, Spacer } from '@nextui-org/react'
import { Package2 } from 'lucide-react'
import Link from 'next/link'

import type { Catalog, Product } from '@/drizzle/schema'

type Props = Catalog & { products: Product[] }

export const CatalogCard = ({ id, title, products }: Props) => {
  return (
    <Link href={`/catalogs/${id}`}>
      <Card>
        <CardBody className="px-3 pb-1">
          {products.length > 0 ? (
            <Image
              alt={title}
              className="aspect-video w-full object-cover object-top"
              src={products[0].images[0].url}
            />
          ) : (
            <div className="flex aspect-video w-full items-center justify-center rounded-large bg-default-200 object-cover object-top">
              <Package2 className="size-12 text-default-400" />
            </div>
          )}
          <Spacer y={2} />
          <div className="flex flex-col gap-2 px-2 pb-4">
            <p className="line-clamp-1 text-large font-medium" title={title}>
              {title}
            </p>
            <Chip
              startContent={<Package2 size={18} />}
              classNames={{
                base: 'bg-foreground text-background'
              }}
            >
              {products.length} {products.length === 1 ? 'Product' : 'Products'}
            </Chip>
          </div>
        </CardBody>
      </Card>
    </Link>
  )
}
