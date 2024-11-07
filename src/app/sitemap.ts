import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://describa.ai',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1
    },
    {
      url: 'https://describa.ai/terms-of-service',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9
    },
    {
      url: 'https://describa.ai/refund-policy',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9
    },
    {
      url: 'https://describa.ai/privacy-policy',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9
    },
    {
      url: 'https://describa.ai/contact',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9
    }
  ]
}
