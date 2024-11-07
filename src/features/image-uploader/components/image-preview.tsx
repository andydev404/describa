import { Button } from '@nextui-org/button'
import { Image } from '@nextui-org/react'
import { X } from 'lucide-react'

import { UploadedFile } from '@/features/image-uploader/types'

interface ImagePreviewProps {
  file: UploadedFile
  onRemove: (file: UploadedFile) => void
}

export const ImagePreview = ({ file, onRemove }: ImagePreviewProps) => {
  return (
    <div className={'relative'}>
      <Button
        onClick={() => onRemove(file)}
        isIconOnly
        radius={'full'}
        size={'sm'}
        className={'absolute right-2 top-2 z-20'}
        aria-label={'remove-file'}
      >
        <X size={16} />
      </Button>
      <Image width={300} isBlurred alt={file.file.name} src={file.preview} />
    </div>
  )
}
