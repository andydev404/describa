import BasicNavbar from '@/app/(marketing)/_components/basic-navbar'
import { Footer } from '@/app/(marketing)/_components/sections/footer'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title:
    'Terms of Service | Transform Product Descriptions with AI-Powered Precision',
  description:
    "Boost your e-commerce sales with Describa's AI-generated product descriptions. Save time, improve SEO, and drive more conversions. Try it now!"
}

const TermsOfServicePage = () => {
  return (
    <div className="relative flex h-screen min-h-dvh w-full flex-col overflow-hidden overflow-y-auto bg-background dark">
      <BasicNavbar />
      <div className="mx-auto mb-10 mt-28 max-w-4xl sm:text-center">
        <h1 className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-foreground sm:text-balance sm:text-5xl">
          Terms of Service
        </h1>
      </div>
      <div className="mx-auto mb-16 w-full max-w-5xl px-6 text-foreground lg:px-8">
        <h2 className={'text-large font-semibold'}>1. Introduction</h2>
        <br />
        <p>
          Welcome to Describa (&#34;we,&#34; &#34;our,&#34; or &#34;us&#34;). By
          accessing or using our AI-powered product description generation
          service (the &#34;Service&#34;), you agree to be bound by these Terms
          of Service (&#34;Terms&#34;). Please read these Terms carefully before
          using the Service.
        </p>
        <br />
        <br />
        <h2 className={'text-large font-semibold'}>2. Account Registration</h2>
        <br />
        <div className={'space-y-1 pl-4'}>
          <h3 className={'text-large font-semibold'}>
            2.1. To use our Service, you must create an account with accurate,
            complete information.
          </h3>
          <h3 className={'text-large font-semibold'}>
            2.2. You are responsible for maintaining the security of your
            account credentials.
          </h3>
          <h3 className={'text-large font-semibold'}>
            2.3. You must be at least 18 years old to use the Service.
          </h3>
          <h3 className={'text-large font-semibold'}>
            2.4. One person or legal entity may not maintain multiple free
            accounts.
          </h3>
        </div>
        <br />
        <br />
        <h2 className={'text-large font-semibold'}>3. Service Usage</h2>
        <br />
        <div className={'pl-4'}>
          <h3 className={'text-large font-semibold'}>
            3.1. License: We grant you a limited, non-exclusive,
            non-transferable license to use the Service.
          </h3>
          <h3 className={'text-large font-semibold'}>
            3.2. Generated Content:
          </h3>
          <ul className={'list-disc space-y-1 pl-4'}>
            <li>
              You own all rights to the product descriptions generated using our
              Service
            </li>
            <li>
              You are responsible for reviewing and editing generated content
              before use
            </li>
            <li>
              We maintain the right to use anonymized data to improve our AI
              models
            </li>
          </ul>
          <h3 className={'text-large font-semibold'}>
            3.3. Usage Restrictions:
          </h3>
          <ul className={'list-disc space-y-1 pl-4'}>
            <li>Do not use the Service for illegal or harmful purposes</li>
            <li>Do not attempt to reverse engineer the Service</li>
            <li>Do not exceed your plan&#39;s usage limits</li>
            <li>
              Do not create content that infringes on others&#39; intellectual
              property rights
            </li>
          </ul>
        </div>
        <br />
        <br />
        <h2 className={'text-large font-semibold'}>4. Payment Terms</h2>
        <br />
        <div className={'pl-4'}>
          <h3 className={'text-large font-semibold'}>
            4.1. Pricing: Current prices are displayed on our website and may be
            updated with notice.
          </h3>
          <h3 className={'text-large font-semibold'}>4.2. Billing:</h3>
          <ul className={'list-disc space-y-1 pl-4'}>
            <li>One-time payments for credit packages</li>
            <li>All fees are non-refundable unless otherwise stated</li>
            <li>Taxes will be added where applicable</li>
          </ul>
          <h3 className={'text-large font-semibold'}>
            4.3. Credit Expiration:
          </h3>
          <ul className={'list-disc space-y-1 pl-4'}>
            <li>Unused credits are not refundable</li>
          </ul>
        </div>
        <br />
        <br />
        <h2 className={'text-large font-semibold'}>5. Service Availability</h2>
        <br />
        <div className={'pl-4'}>
          <h3 className={'text-large font-semibold'}>
            5.1. We strive for 99.9% uptime but do not guarantee uninterrupted
            service.
          </h3>
          <h3 className={'text-large font-semibold'}>
            5.2. We reserve the right to modify or discontinue features with
            notice.
          </h3>
          <h3 className={'text-large font-semibold'}>
            5.3. Scheduled maintenance will be announced in advance when
            possible.
          </h3>
        </div>
        <br />
        <br />
        <h2 className={'text-large font-semibold'}>6. Termination</h2>
        <br />
        <div className={'pl-4'}>
          <h3 className={'text-large font-semibold'}>
            6.1. You may terminate your account at any time.
          </h3>
          <h3 className={'text-large font-semibold'}>
            6.2. We may suspend or terminate accounts for:
          </h3>
          <ul className={'list-disc space-y-1 pl-4'}>
            <li>Violation of these Terms</li>
            <li>Fraudulent activity</li>
            <li>Non-payment</li>
            <li>Extended inactivity</li>
          </ul>
        </div>
        <br />
        <br />
        <h2 className={'text-large font-semibold'}>7. Liability Limitations</h2>
        <br />
        <div className={'pl-4'}>
          <h3 className={'text-large font-semibold'}>
            7.1. The Service is provided &#34;as is&#34; without warranties.
          </h3>
          <h3 className={'text-large font-semibold'}>
            7.2. We are not liable for:
          </h3>
          <ul className={'list-disc space-y-1 pl-4'}>
            <li>Content accuracy</li>
            <li>Business losses</li>
            <li>Indirect damages</li>
            <li>Data loss</li>
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default TermsOfServicePage
