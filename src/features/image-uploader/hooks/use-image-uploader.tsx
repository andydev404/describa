import { useCallback, useState } from 'react'
import { toast } from 'sonner'

import { ACCEPTED_FILE_TYPES } from '@/features/image-uploader/constants'
import { UploadedFile } from '@/features/image-uploader/types'

export const useImageUploader = (maxFiles: number, maxSizeInMB: number) => {
  const [files, setFiles] = useState<UploadedFile[]>([])

  const validateFile = (file: File): string | null => {
    if (file.size > maxSizeInMB * 1024 * 1024) {
      return `${file.name} - File size exceeds ${maxSizeInMB}MB limit`
    }
    if (!Object.keys(ACCEPTED_FILE_TYPES).includes(file.type)) {
      return 'Invalid file type'
    }
    return null
  }

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (files.length + acceptedFiles.length > 3) {
        toast.error('You can only upload up to 3 images')
        return
      }

      const validFiles = acceptedFiles.filter(file => {
        const validationError = validateFile(file)
        if (validationError) {
          toast.error(validationError)
          return false
        }
        return true
      })

      const newFiles = validFiles.map(file => ({
        file,
        preview: URL.createObjectURL(file)
      }))

      setFiles(prevFiles => [...prevFiles, ...newFiles])
    },
    [files]
  )

  const removeFile = useCallback((fileToRemove: UploadedFile) => {
    setFiles(files => files.filter(f => f !== fileToRemove))
    URL.revokeObjectURL(fileToRemove.preview)
  }, [])

  return { files, handleDrop, removeFile }
}
