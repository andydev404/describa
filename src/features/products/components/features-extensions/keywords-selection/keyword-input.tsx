import { Input } from '@nextui-org/input'
import { Button, Tooltip } from '@nextui-org/react'
import { Check } from 'lucide-react'
import { ChangeEvent, KeyboardEvent } from 'react'

type Props = {
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void
  onAdd: () => void
}

export const KeywordInput = ({ value, onChange, onKeyDown, onAdd }: Props) => (
  <Input
    type="text"
    label="Type a keyword"
    value={value}
    onChange={onChange}
    maxLength={20}
    onKeyDown={onKeyDown}
    description="You can hit enter to save the keyword"
    endContent={
      <Tooltip content="Save keyword">
        <Button disableRipple onClick={onAdd} variant="light" isIconOnly>
          <Check size={16} />
        </Button>
      </Tooltip>
    }
  />
)
