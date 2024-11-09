'use client'

import heic2any from 'heic2any'
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
    // Allow HEIC/HEIF files to pass validation since we'll convert them
    const isHeic =
      file.type === 'image/heic' ||
      file.type === 'image/heif' ||
      file.name.toLowerCase().endsWith('.heic') ||
      file.name.toLowerCase().endsWith('.heif')

    if (!isHeic && !Object.keys(ACCEPTED_FILE_TYPES).includes(file.type)) {
      return 'Invalid file type'
    }
    return null
  }

  const convertHeicToJpeg = async (file: File): Promise<File> => {
    try {
      const blob = await heic2any({
        blob: file,
        toType: 'image/jpeg',
        quality: 0.8
      })

      // Handle the case where heic2any returns an array of blobs
      const convertedBlob = Array.isArray(blob) ? blob[0] : blob

      return new File(
        [convertedBlob],
        file.name.replace(/\.(heic|heif)$/i, '.jpg'),
        { type: 'image/jpeg' }
      )
    } catch (error) {
      console.error('Error converting HEIC to JPEG:', error)
      throw new Error('Failed to convert HEIC image')
    }
  }

  const processFile = async (file: File): Promise<UploadedFile | null> => {
    const isHeic =
      file.type === 'image/heic' ||
      file.type === 'image/heif' ||
      file.name.toLowerCase().endsWith('.heic') ||
      file.name.toLowerCase().endsWith('.heif')

    try {
      const processedFile = isHeic ? await convertHeicToJpeg(file) : file
      return {
        file: processedFile,
        preview: URL.createObjectURL(processedFile)
      }
    } catch (error) {
      toast.error(`Failed to process ${file.name}`)
      return null
    }
  }

  const handleDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (files.length + acceptedFiles.length > maxFiles) {
        toast.error(`You can only upload up to ${maxFiles} images`)
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

      try {
        const processedFiles = await Promise.all(validFiles.map(processFile))

        const newFiles = processedFiles.filter(
          (file): file is UploadedFile => file !== null
        )

        setFiles(prevFiles => [...prevFiles, ...newFiles])
      } catch (error) {
        toast.error('Error processing one or more files')
      }
    },
    [files, maxFiles]
  )

  const removeFile = useCallback((fileToRemove: UploadedFile) => {
    setFiles(files => files.filter(f => f !== fileToRemove))
    URL.revokeObjectURL(fileToRemove.preview)
  }, [])

  return { files, handleDrop, removeFile }
}
