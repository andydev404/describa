'use client'

import { Select, SelectItem } from '@nextui-org/select'
import { ChangeEvent, useState, useTransition } from 'react'
import { toast } from 'sonner'

import { type Catalog } from '@/drizzle/schema'
import { updateProduct } from '@/features/products/actions/update-product'

type Props = {
  catalogs: Catalog[]
  productId: string
  catalogId: string
}
export const SelectCatalog = ({ catalogs, productId, catalogId }: Props) => {
  const [value, setValue] = useState(catalogId)
  const [isPending, setTransition] = useTransition()

  const handleSelectionChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setTransition(async () => {
      await updateProduct(productId, {
        catalogId: e.target.value || null,
        tempCatalogId: catalogId || e.target.value
      })
      toast.success('Product updated')
    })
    setValue(e.target.value)
  }

  return (
    <Select
      label={value ? 'Catalog' : 'Select a catalog'}
      size={'sm'}
      className={'max-w-60'}
      variant={'bordered'}
      isLoading={isPending}
      selectedKeys={[value]}
      onChange={handleSelectionChange}
    >
      {catalogs.map(({ id, title }) => (
        <SelectItem key={id}>{title}</SelectItem>
      ))}
    </Select>
  )
}
