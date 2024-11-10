import { FEATURES_TYPES } from '@/features/products/constants'
import { findFeatureById } from '@/features/products/utils'
import { DescriptionProps } from '@/lib/claude/index'

export function generatePrompt({
  features,
  language,
  tone
}: Omit<DescriptionProps, 'imagesUrls'>) {
  const featuresIds = features.map(feature => feature.id)
  const multilingualFeature = findFeatureById(
    features,
    FEATURES_TYPES.MULTILINGUAL
  )
  const selectedLanguages = multilingualFeature?.options || []

  const keywordsFeature = findFeatureById(features, FEATURES_TYPES.KEYWORDS)
  const selectedKeywords = keywordsFeature?.options || []

  const brandFeature = findFeatureById(features, FEATURES_TYPES.BRAND)
  const selectedBrandKeywords = brandFeature?.options || []

  return `
  Analyze the product image(s) provided to understand the product's features, appearance, and unique selling points.
  - Generate the description in the following language(s): ${language}${selectedLanguages.length > 0 ? ',' + selectedLanguages.join(',') : ''}
  - Desired Tone/Style: ${tone}. Maintain consistency with the selected tone throughout the description to align with the brand's voice and appeal to the target audience.
  ${selectedKeywords.length > 0 ? `Integrate these keywords in a way that feels natural and enhances the overall message and maintain optimal keyword density to avoid keyword stuffing: ${selectedKeywords.join(',')}` : ''}
  ${selectedBrandKeywords.length > 0 ? `Adhere strictly to these guidelines, ensuring that the description reflects the brand's identity, values, and messaging: ${selectedBrandKeywords.join(',')}` : ''}
  ${featuresIds.includes('email') ? '- For Email Marketing create a captivating subject line, personalize the content if possible.Format the description according to the best practices' : ''}
  ${
    featuresIds.includes('analytics')
      ? `- Predictive Performance Indicators:
    - Suggest why the description will be effective based on marketing best practices.
    - Highlight elements designed to increase engagement and conversion rates.`
      : ''
  }
  ${
    featuresIds.includes('social')
      ? `- Optimization for Each Social Platform and generate platform-specific versions for:
     a. Instagram (2-3 sentences, with relevant hashtags)
     c. Facebook (3-4 sentences, more detailed than Instagram). Keep it engaging with a strong opening line, use of emojis (if brand-appropriate), and relevant hashtags.`
      : ''
  }
     
  Additional Instructions:
  - Use clear and concise language suitable for the target audience.
  - Break up text into short paragraphs and use bullet points where appropriate.
  - Tap into the customer's emotions and desires.
  - Use persuasive language to position the product as the ideal solution.
  - the product title is mandatory
  - Predictive Performance Indicators is mandatory
  ${selectedLanguages.length > 0 ? '- JSON properties must be in all languages' : ''}
  
  Return a JSON object. Follow this structure:
  ${
    selectedLanguages.length > 0
      ? `[[language]: {
      title: "",
      description: "",
      key_features: [],
      ${
        featuresIds.includes('email')
          ? `email_marketing: {
        subject_line: "",
        body: ""
      },`
          : ''
      }
      ${
        featuresIds.includes('social')
          ? `social_media: {
        facebook: "",
        instagram: ""
      },`
          : ''
      }
      ${
        featuresIds.includes('analytics')
          ? `performance_indicators: {
        effectiveness_factors: [],
        conversion_elements: []
      }`
          : ''
      }
      
    }]`
      : `{
      title: "",
      description: "",
      key_features: [],
            ${
              featuresIds.includes('email')
                ? `email_marketing: {
        subject_line: "",
        body: ""
      },`
                : ''
            }
      ${
        featuresIds.includes('social')
          ? `social_media: {
        facebook: "",
        instagram: ""
      },`
          : ''
      }
      ${
        featuresIds.includes('analytics')
          ? `performance_indicators: {
        effectiveness_factors: [],
        conversion_elements: []
      }`
          : ''
      }
    }`
  }
    
    
    Please follow the guidelines strictly and ensure that the descriptions and content reflect the brand’s identity, values, and messaging.
  `
}

export function generatePromptV2({
  features,
  language,
  tone
}: Omit<DescriptionProps, 'imagesUrls'>) {
  const featuresIds = features.map(feature => feature.id)
  const multilingualFeature = findFeatureById(
    features,
    FEATURES_TYPES.MULTILINGUAL
  )
  const selectedLanguages = multilingualFeature?.options || []

  const keywordsFeature = findFeatureById(features, FEATURES_TYPES.KEYWORDS)
  const selectedKeywords = keywordsFeature?.options || []

  const brandFeature = findFeatureById(features, FEATURES_TYPES.BRAND)
  const selectedBrandKeywords = brandFeature?.options || []

  return `
    First, review the following important information:
    Language preferences:
    <language_preferences>
    ${language}${selectedLanguages.length > 0 ? ',' + selectedLanguages.join(',') : ''}
    </language_preferences>
    
    Desired Tone/Style:
    <tone_style>
    ${tone}
    </tone_style>
    
    ${
      selectedKeywords.length > 0
        ? `
      Keywords to integrate:
      <keywords>
        ${selectedKeywords.join(',')}
      </keywords>
      `
        : ''
    }    

    ${
      selectedBrandKeywords.length > 0
        ? `
      Brand Guidelines:
      <brand_guidelines>
      ${selectedBrandKeywords.join(',')}
      </brand_guidelines>
      `
        : ''
    }
    
    Follow these steps to create the marketing content:

    1. Analyze the product image(s) provided to understand the product's features, appearance, and unique selling points.
    2. Generate a main product description:
       - It's OK for the description to be quite long.
       - Use the specified language(s)
       - Maintain the selected tone throughout
       ${selectedKeywords.length > 0 ? '- Integrate the provided keywords naturally' : ''}
       ${selectedBrandKeywords.length > 0 ? '- Adhere to the brand guidelines' : ''}
       - Use clear, concise language for the target audience
       - Include a product title
    
    ${
      featuresIds.includes('email')
        ? `
      3. Create email marketing content:
         - Develop a captivating subject line
         - Format the description for email marketing
    `
        : ''
    }    

    ${
      featuresIds.includes('analytics')
        ? `
      4. Generate Predictive Performance Indicators:
         - Explain why the description will be effective
         - Highlight engagement and conversion-boosting elements
    `
        : ''
    }    

    ${
      featuresIds.includes('social')
        ? `
      5. Optimize for specific social media platforms:
         a. Instagram: 2-3 sentences with relevant hashtags
         b. Facebook: 3-4 sentences, strong opening, emojis if appropriate, relevant hashtags
    `
        : ''
    }
   
   Structure your final output as a JSON object with the following keys:
    ${
      selectedLanguages.length > 0
        ? `[[language]: {
      title: "",
      description: "",
      key_features: [],
      ${
        featuresIds.includes('email')
          ? `email_marketing: {
        subject_line: "",
        body: ""
      },`
          : ''
      }
      ${
        featuresIds.includes('social')
          ? `social_media: {
        facebook: "",
        instagram: ""
      },`
          : ''
      }
      ${
        featuresIds.includes('analytics')
          ? `performance_indicators: {
        effectiveness_factors: [],
        conversion_elements: []
      }`
          : ''
      }
      
    }]`
        : `{
      title: "",
      description: "",
      key_features: [],
            ${
              featuresIds.includes('email')
                ? `email_marketing: {
        subject_line: "",
        body: ""
      },`
                : ''
            }
      ${
        featuresIds.includes('social')
          ? `social_media: {
        facebook: "",
        instagram: ""
      },`
          : ''
      }
      ${
        featuresIds.includes('analytics')
          ? `performance_indicators: {
        effectiveness_factors: [],
        conversion_elements: []
      }`
          : ''
      }
    }`
    }

  Ensure that all content maintains the specified tone and adheres to all guidelines throughout the creation process.
  `
}
