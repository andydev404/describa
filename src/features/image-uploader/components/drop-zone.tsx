import { ImageUp } from 'lucide-react'

import { DEFAULT_MAX_SIZE_MB } from '@/features/image-uploader/constants'
import { cn } from '@/lib/utils'

interface DropzoneProps {
  isDragActive: boolean
  remainingFiles: number
  getRootProps: any
  getInputProps: any
}

export const Dropzone = ({
  isDragActive,
  remainingFiles,
  getRootProps,
  getInputProps
}: DropzoneProps) => (
  <div
    {...getRootProps()}
    className={cn(
      'cursor-pointer rounded-lg border-2 border-dashed p-8 text-center transition-colors',
      isDragActive ? 'border-primary bg-primary/10' : 'border-input',
      remainingFiles === 0 && 'pointer-events-none opacity-50'
    )}
  >
    <input {...getInputProps()} />
    <ImageUp className="mx-auto size-12 text-default-400" />
    <p className="mt-2 text-sm text-default-600">
      Drag & Drop or{' '}
      <span className="font-semibold text-foreground">Choose file</span> to
      upload
    </p>
    <p className="mt-1 text-xs text-default-500">
      PNG, JPG, HEIC & WEBP formats, {DEFAULT_MAX_SIZE_MB}MB max file size
    </p>
    <p className="mt-1 text-xs text-default-500">
      {remainingFiles} image{remainingFiles !== 1 ? 's' : ''} remaining
    </p>
  </div>
)
