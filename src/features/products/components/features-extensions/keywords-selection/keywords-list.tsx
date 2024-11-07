import { Chip } from '@nextui-org/react'

type Props = {
  keywords: string[]
  onDelete: (keyword: string) => void
}

export const KeywordsList = ({ keywords, onDelete }: Props) =>
  keywords.length > 0 && (
    <div className="flex flex-wrap gap-2">
      {keywords.map(keyword => (
        <Chip key={keyword} onClose={() => onDelete(keyword)} variant="flat">
          {keyword}
        </Chip>
      ))}
    </div>
  )
