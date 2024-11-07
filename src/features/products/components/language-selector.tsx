import { Select, SelectItem } from '@nextui-org/react'

import { LanguageOption } from '@/features/products/types'

type Props = {
  options: LanguageOption[]
  label: string
  value: string
  onValueChange: (value: string) => void
}

export const LanguageSelector = ({
  options,
  label,
  value,
  onValueChange
}: Props) => (
  <Select
    label={label}
    selectedKeys={[value]}
    onChange={e => onValueChange(e.target.value)}
  >
    {options.map(({ id, label }) => (
      <SelectItem key={id}>{label}</SelectItem>
    ))}
  </Select>
)
