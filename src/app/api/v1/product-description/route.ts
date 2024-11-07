import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

import { utapi } from '@/app/api/uploadthing/core'
import { type NewProduct } from '@/drizzle/schema'
import { ERROR_TYPES, FEATURES_TYPES } from '@/features/products/constants'
import { createProductWithDescription } from '@/features/products/db/create-product-with-description'
import { Feature, ProductImageType } from '@/features/products/types'
import {
  calculateTotalCredits,
  getTitleAndShortDescription,
  ParseProductDescription
} from '@/features/products/utils'
import { INITIAL_CREDITS } from '@/features/users/constants'
import { deductCredits } from '@/features/users/db/deduct-credits'
import { getUser } from '@/features/users/db/get-user'
import { generateClaudeDescription } from '@/lib/claude'

export async function POST(req: Request) {
  try {
    // 1. Authentication
    const { userId } = auth()
    if (!userId) {
      return NextResponse.json(
        { error: ERROR_TYPES.UNAUTHORIZED },
        { status: 401 }
      )
    }

    // 2. Get user
    const user = await getUser(userId)
    if (!user) {
      return NextResponse.json(
        { error: ERROR_TYPES.USER_NOT_FOUND },
        { status: 404 }
      )
    }

    // 3. Parse request
    const formData = await req.formData()
    const tone = formData.get('tone') as string
    const language = formData.get('language') as string
    const images = formData.getAll('images') as File[]
    const features = JSON.parse(formData.get('features') as string) as Feature[]
    const featuresId = features.map(f => f.id)
    const isMultilingual = featuresId.includes(FEATURES_TYPES.MULTILINGUAL)

    // 4. Simple image validation request
    if (!images.length || images.length > 3) {
      return NextResponse.json(
        {
          error: 'Please provide 1-3 images'
        },
        { status: 400 }
      )
    }

    // 5. Calculate credit cost
    const totalCreditCost = calculateTotalCredits(features, INITIAL_CREDITS)

    // 6. Check credit balance
    if (user.currentCredits < totalCreditCost) {
      return NextResponse.json(
        {
          error: ERROR_TYPES.INSUFFICIENT_CREDITS,
          required: totalCreditCost,
          available: user.currentCredits
        },
        { status: 402 }
      )
    }

    // 7. Upload images
    const imagesType = images.map(image => image.type)
    const imagesResponse = await utapi.uploadFiles(images)
    const imagesUrls = imagesResponse.map((res, index) => ({
      url: res.data!.url,
      type: imagesType[index] as ProductImageType
    }))

    // 8. Generate description
    const { description, inputTokens, outputTokens } =
      await generateClaudeDescription({
        imagesUrls,
        features,
        tone,
        language
      })
    console.log({ description })
    const parsedDescription = ParseProductDescription(description)
    console.log({ parsedDescription })
    const { title, shortDescription } = getTitleAndShortDescription(
      isMultilingual,
      language,
      parsedDescription
    )

    // 9. Create product and description
    const productDetails: NewProduct = {
      tone,
      language,
      features,
      images: imagesUrls,
      clerkUserId: userId,
      title: title,
      shortDescription: shortDescription.slice(0, 120)
    }
    const insertedProduct = await createProductWithDescription(
      productDetails,
      parsedDescription,
      { totalCreditCost, inputTokens, outputTokens }
    )

    // 10. Deduct credits
    const remainingCredits = user.currentCredits - totalCreditCost
    await deductCredits(userId, remainingCredits)

    // 11. Return response
    return NextResponse.json({
      productId: insertedProduct.id,
      creditsUsed: totalCreditCost,
      creditsRemaining: user.currentCredits - totalCreditCost
    })
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Internal server error'
      },
      { status: 500 }
    )
  }
}
