import { NextResponse } from 'next/server'

import { validateApiKeyDb } from '@/features/api-keys/db/validate-api-key'
import { ERROR_TYPES, Language, Tone } from '@/features/products/constants'
import { Feature, ProductImageType } from '@/features/products/types'
import {
  calculateTotalCredits,
  ParseProductDescription
} from '@/features/products/utils'
import { INITIAL_CREDITS } from '@/features/users/constants'
import { deductCredits } from '@/features/users/db/deduct-credits'
import { generateClaudeDescription } from '@/lib/claude'

export const maxDuration = 60

interface IImage {
  url: string
  type: keyof ProductImageType
}

interface RequestBody {
  images: IImage[]
  features?: Feature[]
  language: string
  tone: string
}

const validLanguages: Language[] = [
  'en',
  'zh',
  'es',
  'ar',
  'hi',
  'ja',
  'de',
  'fr',
  'pt',
  'ru'
]
const validTones: Tone[] = [
  'professional',
  'conversational',
  'enthusiastic',
  'technical',
  'empathetic',
  'educational',
  'persuasive',
  'casual'
]

function isValidLanguage(language: string): language is Language {
  return validLanguages.includes(language as Language)
}

function isValidTone(tone: string): tone is Tone {
  return validTones.includes(tone as Tone)
}

export async function POST(req: Request) {
  try {
    // 1. Authentication
    const apiKey = req.headers.get('x-api-key')
    if (!apiKey) {
      return NextResponse.json({ error: 'API key required' }, { status: 401 })
    }

    const validApiKey = await validateApiKeyDb(apiKey)
    if (!validApiKey) {
      return NextResponse.json({ error: 'Invalid API key' }, { status: 401 })
    }

    // Parse request body
    const body: RequestBody = await req.json()
    const { images, features = [], language, tone } = body
    const imagesUrls = images.map((image: IImage) => ({
      url: image.url,
      type: image.type as ProductImageType
    }))

    // Validate language and tone
    if (!isValidLanguage(language)) {
      return NextResponse.json(
        { error: 'Invalid language provided' },
        { status: 400 }
      )
    }

    if (!isValidTone(tone)) {
      return NextResponse.json(
        { error: 'Invalid tone provided' },
        { status: 400 }
      )
    }

    // Simple image validation request
    if (!images.length || images.length > 3) {
      return NextResponse.json(
        {
          error: 'Please provide 1-3 images'
        },
        { status: 400 }
      )
    }

    // Calculate credit cost
    const totalCreditCost = calculateTotalCredits(features, INITIAL_CREDITS)

    // Check credit balance
    if (validApiKey.user.currentCredits < totalCreditCost) {
      return NextResponse.json(
        {
          error: ERROR_TYPES.INSUFFICIENT_CREDITS,
          required: totalCreditCost,
          available: validApiKey.user.currentCredits
        },
        { status: 402 }
      )
    }

    // Generate description
    const { description } = await generateClaudeDescription({
      imagesUrls,
      features,
      tone,
      language
    })

    const parsedDescription = ParseProductDescription(description)

    // Deduct credits
    const remainingCredits = validApiKey.user.currentCredits - totalCreditCost
    await deductCredits(validApiKey.user.clerkUserId, remainingCredits)

    // Return response
    return NextResponse.json({
      product: parsedDescription,
      creditsUsed: totalCreditCost,
      creditsRemaining: remainingCredits
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
