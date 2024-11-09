import { FEATURES_TYPES } from '@/features/products/constants'
import {
  Feature,
  IProductDetails,
  ProductImageType
} from '@/features/products/types'

export function findFeatureById(features: Feature[], featureId: string) {
  return features.find(feature => feature.id === featureId)
}

export function extractOptionsFromValue(value: string) {
  return value ? value.split(',').filter(Boolean) : []
}

export function calculateTotalCredits(
  features: Feature[],
  initialValue: number
): number {
  return features.reduce((prev, curr) => {
    switch (curr.id) {
      case FEATURES_TYPES.BRAND:
      case FEATURES_TYPES.MULTILINGUAL:
      case FEATURES_TYPES.KEYWORDS:
        return prev + (curr.options ? curr.options.length : 0)
      default:
        return prev + curr.creditCost
    }
  }, initialValue)
}

export async function imageUrlToBase64(url: string) {
  try {
    const response = await fetch(url)
    const arrayBuffer = await response.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    return buffer.toString('base64')
  } catch (error) {
    console.error(`Error converting image to base64: ${url}`, error)
    throw error
  }
}

export async function transformImagesToClaudeBase64(
  imageUrls: { url: string; type: ProductImageType }[]
) {
  try {
    const content = []

    for (let i = 0; i < imageUrls.length; i++) {
      // Add text label
      content.push({
        type: 'text' as const,
        text: `Image ${i + 1}:`
      })

      // Add image
      const imageData = await imageUrlToBase64(imageUrls[i].url)
      content.push({
        type: 'image' as const,
        source: {
          type: 'base64' as const,
          media_type: imageUrls[i].type,
          data: imageData
        }
      })
    }
    return content
  } catch (error) {
    console.error('Error converting images:', error)
    throw error
  }
}

export function ParseProductDescription(description: string) {
  const parsedDescription: IProductDetails | Record<string, IProductDetails> =
    JSON.parse(description)

  return parsedDescription
}

export function getTitleAndShortDescription(
  isMultilingual: boolean,
  language: string,
  parsedDescription: IProductDetails | Record<string, IProductDetails>
) {
  const title = isMultilingual
    ? (parsedDescription as Record<string, IProductDetails>)[language].title
    : (parsedDescription as IProductDetails).title
  const shortDescription = isMultilingual
    ? (parsedDescription as Record<string, IProductDetails>)[language]
        .description
    : (parsedDescription as IProductDetails).description

  return { title, shortDescription }
}

export function getStartAndEndWeekISO() {
  // Get the current date
  const today = new Date()

  // Get the current date's weekday (0 for Sunday, 1 for Monday, etc.)
  const dayOfWeek = today.getDay()

  // Calculate the start of the week (Monday)
  const startOfWeek = new Date(today)
  startOfWeek.setDate(today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1)) // Adjust to Monday

  // Calculate the end of the week (Sunday)
  const endOfWeek = new Date(startOfWeek)
  endOfWeek.setDate(startOfWeek.getDate() + 6) // Sunday is 6 days after Monday

  // Format the dates to ISO format
  const startOfWeekISO = startOfWeek.toISOString()
  const endOfWeekISO = endOfWeek.toISOString()

  return {
    startOfWeekISO,
    endOfWeekISO
  }
}

export const dollarToCents = (amount: number): number =>
  Math.round(amount * 100)
