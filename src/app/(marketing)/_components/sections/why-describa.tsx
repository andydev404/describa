import React from 'react'

const features = [
  {
    name: 'Automated Content Creation',
    description: [
      'Reduce product listing time by 90%',
      'Generate hundreds of descriptions daily',
      'Maintain consistent quality across your catalog',
      'Perfect for dropshipping and large inventories'
    ]
  },
  {
    name: 'Advanced SEO Optimization',
    description: [
      'Automatically target profitable keywords',
      'Improve organic search rankings',
      'Increase product visibility',
      'Optimize for marketplace search algorithms'
    ]
  },
  {
    name: 'Conversion Rate Optimization',
    description: [
      'Create persuasive product benefits',
      'Include proven sales triggers',
      'Optimize for buyer psychology',
      'Increase add-to-cart rates'
    ]
  },
  {
    name: 'Brand Voice Customization',
    description: [
      'Match your unique brand tone',
      'Maintain consistent messaging',
      'Scale your brand voice efficiently'
    ]
  },
  {
    name: 'Multi-Platform Content Creation',
    description: [
      'Optimize for Facebook, and Instagram',
      'Create platform-specific descriptions',
      'Generate social media variations',
      'Craft email marketing content'
    ]
  },
  {
    name: 'International Market Expansion',
    description: [
      'Translate into 5+ languages',
      'Maintain SEO value across languages',
      'Localize for different markets',
      'Scale globally with ease'
    ]
  }
]

export const WhyDescriba = () => {
  return (
    <>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base/7 font-semibold text-primary">
            Powerful E-commerce Features That Drive Results
          </h2>
          <p className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-balance">
            Why Choose Describa?
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2 lg:max-w-none lg:grid-cols-3">
            {features.map((feature, index) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base/7 font-semibold text-foreground">
                  <div className="flex size-8 flex-none items-center justify-center rounded-full border border-primary bg-primary-50 text-small text-primary">
                    {index + 1}
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-4 pl-4 text-base/7 text-default-500">
                  <ul className={'list-disc'}>
                    {feature.description.map((desc, i) => (
                      <li key={i}>{desc}</li>
                    ))}
                  </ul>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </>
  )
}
