import { Card, CardBody, Image, Spacer } from '@nextui-org/react'
import Link from 'next/link'

import type { Product } from '@/drizzle/schema'

type Props = Product

export const ProductCard = ({ images, id, title, shortDescription }: Props) => {
  return (
    <Link href={`/products/${id}`}>
      <Card>
        <CardBody className="px-3 pb-1">
          <Image
            alt={title}
            className="aspect-video w-full object-cover object-top"
            src={images[0].url}
          />
          <Spacer y={2} />
          <div className="flex flex-col gap-2 px-2 pb-4">
            <p className="line-clamp-1 text-large font-medium" title={title}>
              {title}
            </p>
            <p className="line-clamp-2 text-small text-default-400">
              {shortDescription}
            </p>
          </div>
        </CardBody>
      </Card>
    </Link>
  )
}
