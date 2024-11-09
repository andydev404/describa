import { Anthropic } from '@anthropic-ai/sdk'

import { env } from '@/app/data/env/server'
import { FEATURES_TYPES } from '@/features/products/constants'
import { Feature, ProductImageType } from '@/features/products/types'
import { transformImagesToClaudeBase64 } from '@/features/products/utils'
import { generatePrompt } from '@/lib/claude/prompt'

const anthropic = new Anthropic({
  apiKey: env.ANTHROPIC_API_KEY
})

export interface DescriptionProps {
  imagesUrls: { url: string; type: ProductImageType }[]
  features: Feature[]
  tone: string
  language: string
}

export async function generateClaudeDescription({
  imagesUrls,
  features,
  tone,
  language
}: DescriptionProps) {
  const prompt = generatePrompt({ features, tone, language })
  const defaultToken = 2024
  const multilingualFeature = features.find(
    f => f.id === FEATURES_TYPES.MULTILINGUAL
  )?.options
  const maxTokens = multilingualFeature
    ? multilingualFeature.length * defaultToken
    : defaultToken
  try {
    const base64Images = await transformImagesToClaudeBase64(imagesUrls)

    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: maxTokens,
      system:
        'You are an expert copywriter and marketer specialized in creating compelling product descriptions that drive engagement and sales',
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: prompt
            },
            ...base64Images
          ]
        }
      ]
    })

    return {
      description: (response.content[0] as { text: string }).text,
      inputTokens: response.usage.input_tokens,
      outputTokens: response.usage.output_tokens
    }
  } catch (err) {
    console.error('Error generating description:', err)
    throw new Error('Failed to generate description. Please try again later.')
  }
}
