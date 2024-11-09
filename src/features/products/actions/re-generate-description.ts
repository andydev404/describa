'use server'

import { auth } from '@clerk/nextjs/server'

import { ERROR_TYPES, FEATURES_TYPES } from '@/features/products/constants'
import { getProductDetails } from '@/features/products/db/get-product-details'
import { updateProductDb } from '@/features/products/db/update-product'
import { updateProductDescription } from '@/features/products/db/update-product-description'
import { ProductImageType } from '@/features/products/types'
import {
  getTitleAndShortDescription,
  ParseProductDescription
} from '@/features/products/utils'
import { deductCredits } from '@/features/users/db/deduct-credits'
import { getUser } from '@/features/users/db/get-user'
import { generateClaudeDescription } from '@/lib/claude'

export const reGenerateDescription = async (productId: string) => {
  const { userId } = await auth()

  if (userId == null) {
    throw new Error(ERROR_TYPES.UNAUTHORIZED)
  }

  const user = await getUser(userId)
  if (user == null) {
    throw new Error(ERROR_TYPES.USER_NOT_FOUND)
  }

  const product = await getProductDetails(productId)
  if (product == null) {
    throw new Error('Product not found')
  }

  const totalCreditsCost = product.productDescription.creditsCost

  if (user.currentCredits < totalCreditsCost) {
    throw new Error(ERROR_TYPES.INSUFFICIENT_CREDITS)
  }

  const { description, inputTokens, outputTokens } =
    await generateClaudeDescription({
      imagesUrls: product.images.map(image => ({
        ...image,
        type: image.type as ProductImageType
      })),
      features: product.features,
      tone: product.tone,
      language: product.language
    })
  const featuresId = product.features.map(f => f.id)
  const isMultilingual = featuresId.includes(FEATURES_TYPES.MULTILINGUAL)

  const parsedDescription = ParseProductDescription(description)
  const { title, shortDescription } = getTitleAndShortDescription(
    isMultilingual,
    product.language,
    parsedDescription
  )

  await updateProductDb(productId, userId, {
    title,
    shortDescription,
    updatedAt: new Date()
  })
  await updateProductDescription(productId, userId, parsedDescription)
  await deductCredits(userId, user.currentCredits - totalCreditsCost)

  return { description: parsedDescription, inputTokens, outputTokens }
}
