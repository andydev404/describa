import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: ['/'],
      disallow: [
        '/search?q=',
        '/dashboard',
        '/billing',
        '/products/',
        '/catalogs'
      ]
    },
    sitemap: ['https://describa.ai/sitemap.xml']
  }
}
