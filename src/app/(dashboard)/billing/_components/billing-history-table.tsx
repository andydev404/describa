'use client'

import {
  Chip,
  Spacer,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from '@nextui-org/react'
import { format } from 'date-fns'
import { Check } from 'lucide-react'
import { Key, useCallback } from 'react'

import { type BillingHistory } from '@/drizzle/schema'

const columns = [
  {
    key: 'date',
    label: 'Date'
  },
  {
    key: 'credits',
    label: 'Credits'
  },
  {
    key: 'amount',
    label: 'Amount'
  },
  {
    key: 'status',
    label: 'Status'
  }
]

type Props = {
  history: BillingHistory[]
  hideTitle?: boolean
}

interface HistoryRow {
  key: string | undefined
  date: string
  credits: number
  amount: string
  status: string
}

export const BillingHistoryTable = ({ history, hideTitle }: Props) => {
  const rows: HistoryRow[] = history.map(history => ({
    key: history.id,
    date: format(history.createdAt!, 'PPP'),
    credits: history.credits,
    amount: history.amount,
    status: history.status
  }))

  const renderCell = useCallback((history: HistoryRow, columnKey: Key) => {
    const cellValue = history[columnKey as keyof HistoryRow]

    switch (columnKey) {
      case 'status':
        return (
          <Chip color="success" startContent={<Check size={18} />}>
            {cellValue}
          </Chip>
        )
      case 'amount':
        return `$${cellValue}`
      default:
        return cellValue
    }
  }, [])

  return (
    <>
      {!hideTitle && (
        <>
          <h2 className={'text-xl font-semibold'}>Purchase History</h2>
          <p className={'text-small text-default-500'}>
            View your credit purchase history
          </p>
          <Spacer y={4} />
        </>
      )}
      <Table aria-label="Billing history">
        <TableHeader columns={columns}>
          {column => (
            <TableColumn align={'center'} key={column.key}>
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={rows} emptyContent={'No invoices to display.'}>
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
      <Spacer y={12} />
    </>
  )
}
