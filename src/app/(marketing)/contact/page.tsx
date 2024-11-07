import { Dot } from 'lucide-react'

import BasicNavbar from '@/app/(marketing)/_components/basic-navbar'
import { Cta } from '@/app/(marketing)/_components/sections/cta'
import { Footer } from '@/app/(marketing)/_components/sections/footer'
import { Faq } from '@/app/(marketing)/contact/_components/faq'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact | Transform Product Descriptions with AI-Powered Precision',
  description:
    "Boost your e-commerce sales with Describa's AI-generated product descriptions. Save time, improve SEO, and drive more conversions. Try it now!"
}

const ContactPage = () => {
  return (
    <div className="relative flex h-screen min-h-dvh w-full flex-col overflow-hidden overflow-y-auto bg-background dark">
      <BasicNavbar />
      <div className="mx-auto mb-10 mt-28 max-w-4xl sm:text-center">
        <p className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-foreground sm:text-balance sm:text-5xl">
          Get in Touch
        </p>
        <p className="mt-6 text-lg/8 text-default-500">
          Whether you have questions about our AI technology, need technical
          support, or want to explore enterprise solutions, our team is ready to
          assist you. Choose the best way to reach us below.
        </p>
      </div>
      <div className="mx-auto mb-16 max-w-5xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-2 lg:gap-8">
          <div className="rounded-2xl border border-default-100 bg-white/5 p-10">
            <h3 className="text-base/7 font-semibold text-foreground">
              Email Support
            </h3>
            <p className={'mb-2 text-small text-default-500'}>
              For general inquiries & support
            </p>
            <ul>
              <li className="flex gap-x-3">
                <Dot
                  aria-hidden="true"
                  className="h-7 w-5 flex-none text-default-500"
                />
                <a
                  href="mailto:support@describa.ai"
                  className="font-semibold text-primary"
                >
                  support@describa.ai
                </a>
              </li>
              <li className="flex gap-x-3 text-foreground">
                <Dot
                  aria-hidden="true"
                  className="h-7 w-5 flex-none text-default-500"
                />
                Response within 24 hours
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-default-100 bg-white/5 p-10">
            <h3 className="text-base/7 font-semibold text-foreground">
              Live Chat
            </h3>
            <p className={'mb-2 text-small text-default-500'}>
              For quick questions & guidance
            </p>
            <ul>
              <li className="flex gap-x-3 text-foreground">
                <Dot
                  aria-hidden="true"
                  className="h-7 w-5 flex-none text-default-500"
                />
                Available Monday-Friday
              </li>
              <li className="flex gap-x-3 text-foreground">
                <Dot
                  aria-hidden="true"
                  className="h-7 w-5 flex-none text-default-500"
                />
                9:00 AM - 6:00 PM EST
              </li>
              <li className="flex gap-x-3 text-foreground">
                <Dot
                  aria-hidden="true"
                  className="h-7 w-5 flex-none text-default-500"
                />
                Instant responses during business hours
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Faq />
      <Cta />
      <Footer />
    </div>
  )
}

export default ContactPage
