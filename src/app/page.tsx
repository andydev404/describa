import { Spacer } from '@nextui-org/react'

import { Cta } from '@/app/(marketing)/_components/sections/cta'
import { Faq } from '@/app/(marketing)/_components/sections/faq'
import { Footer } from '@/app/(marketing)/_components/sections/footer'
import { HeroSection } from '@/app/(marketing)/_components/sections/hero-section'
import { HowItWorks } from '@/app/(marketing)/_components/sections/how-it-works'
import { MeetDescriba } from '@/app/(marketing)/_components/sections/meet-describa'
import { Pricing } from '@/app/(marketing)/_components/sections/pricing'
import { WhyDescriba } from '@/app/(marketing)/_components/sections/why-describa'

const jsonLd = {
  '@context': 'https://schema.org/',
  '@type': 'WebSite',
  name: 'Describa',
  url: 'https://describa.ai',
  headline: 'Transform Product Descriptions with AI-Powered Precision',
  description:
    "Boost your e-commerce sales with Describa's AI-generated product descriptions. Save time, improve SEO, and drive more conversions.",
  image: 'https://utfs.io/f/gzOTTZHX3WMAMUjNjNzQVO18afWMlYdDK7b5FuPkHhwRIpAX'
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="relative flex h-screen min-h-dvh w-full flex-col overflow-hidden overflow-y-auto bg-background dark">
        <HeroSection />
        <Spacer y={10} />
        <MeetDescriba />
        <WhyDescriba />
        <Spacer y={36} />
        <HowItWorks />
        <Spacer y={10} />
        <Pricing />
        <Faq />
        <Cta />
        <Footer />
      </div>
    </>
  )
}
