'use client'

import { Card, Spacer } from '@nextui-org/react'
import { useEffect } from 'react'
import { useDropzone } from 'react-dropzone'

import { Dropzone } from '@/features/image-uploader/components/drop-zone'
import { ImagePreview } from '@/features/image-uploader/components/image-preview'
import { ACCEPTED_FILE_TYPES, DEFAULT_MAX_FILES, DEFAULT_MAX_SIZE_MB } from '@/features/image-uploader/constants'
import { useImageUploader } from '@/features/image-uploader/hooks/use-image-uploader'
import { cn } from '@/lib/utils'

interface ImageUploaderProps {
  maxFiles?: number
  maxSizeInMB?: number
  onFilesChange?: (files: File[]) => void
  className?: string
}

const ImageUploader = ({
                         maxFiles = DEFAULT_MAX_FILES,
                         maxSizeInMB = DEFAULT_MAX_SIZE_MB,
                         onFilesChange,
                         className
                       }: ImageUploaderProps) => {
  const { files, handleDrop, removeFile } = useImageUploader(
    maxFiles,
    maxSizeInMB
  )
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    accept: ACCEPTED_FILE_TYPES,
    disabled: files.length >= maxFiles
  })

  useEffect(() => {
    const validFiles = files.map(f => f.file)
    onFilesChange?.(validFiles)
  }, [files, onFilesChange])

  return (
    <Card className={cn('mt-4 w-full p-6 shadow-small', className)}>
      <div className="flex items-center gap-1 flex-wrap">
        <h3 className="font-medium">
          Product Image(s){' '}
          <span className={'text-small text-danger-500'}>*</span>
        </h3>
        -
        <span className="text-small text-default-500">
          Upload one or more images (limit {maxFiles}) of the same product
        </span>
      </div>
      {files.length > 0 && (
        <>
          <Spacer y={4} />
          <div className="grid grid-cols-3 gap-4">
            {files.map((file, index) => (
              <ImagePreview file={file} onRemove={removeFile} key={index} />
            ))}
          </div>
        </>
      )}
      <Spacer y={4} />
      <Dropzone
        isDragActive={isDragActive}
        remainingFiles={maxFiles - files.length}
        getRootProps={getRootProps}
        getInputProps={getInputProps}
      />
    </Card>
  )
}

export default ImageUploader
