'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from '@nextui-org/react'
import { format } from 'date-fns'
import Link from 'next/link'
import { Key, useCallback } from 'react'

import { type Product, type ProductDescription } from '@/drizzle/schema'

type Props = {
  products: (Product & { productDescription: ProductDescription })[]
}

const columns = [
  {
    key: 'title',
    label: 'Title'
  },
  {
    key: 'creditCost',
    label: 'Credits Cost'
  },
  {
    key: 'date',
    label: 'Created Date'
  }
]

interface ProductRow {
  key: string
  title: string
  creditCost: number
  date: string
}

export const LastProducts = ({ products }: Props) => {
  const rows = products.map((p, i) => ({
    key: p.id,
    title: p.title,
    creditCost: p.productDescription.creditsCost,
    date: format(p.createdAt, 'PPP')
  }))

  const renderCell = useCallback((product: ProductRow, columnKey: Key) => {
    const cellValue = product[columnKey as keyof ProductRow]

    switch (columnKey) {
      case 'title':
        return (
          <Link
            href={`/products/${product.key}`}
            className={'block max-w-sm truncate'}
          >
            {cellValue}
          </Link>
        )
      default:
        return cellValue
    }
  }, [])

  return (
    <>
      <h2 className={'mb-4 font-semibold'}>Last 5 descriptions generated</h2>
      <Table aria-label="Last products">
        <TableHeader columns={columns}>
          {column => (
            <TableColumn
              key={column.key}
              align={column.key === 'title' ? 'start' : 'center'}
            >
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={rows} emptyContent={'No products to display.'}>
          {item => (
            <TableRow key={item.key}>
              {columnKey => (
                <TableCell className={'font-medium'}>
                  {renderCell(item, columnKey)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  )
}
