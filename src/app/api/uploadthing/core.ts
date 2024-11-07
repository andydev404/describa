import { auth } from '@clerk/nextjs/server'
import { UploadThingError } from '@uploadthing/shared'
import { createUploadthing, type FileRouter } from 'uploadthing/next'
import { UTApi } from 'uploadthing/server'

const f = createUploadthing({
  errorFormatter: err => {
    console.log('Error uploading file', err.message)
    console.log('  - Above error caused by:', err.cause)
    return { message: err.message }
  }
})

export const ourFileRouter = {
  productImages: f({
    image: { maxFileSize: '32MB', acl: 'public-read', maxFileCount: 3 }
  })
    .middleware(async () => {
      const { userId } = auth()
      if (!userId) throw new UploadThingError('Unauthorized')
      return { userId }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      return { uploadedBy: metadata.userId, url: file.url }
    })
} satisfies FileRouter

export const utapi = new UTApi()

export type OurFileRouter = typeof ourFileRouter
