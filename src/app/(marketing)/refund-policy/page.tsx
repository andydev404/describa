import BasicNavbar from '@/app/(marketing)/_components/basic-navbar'
import { Footer } from '@/app/(marketing)/_components/sections/footer'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title:
    'Refund Policy | Transform Product Descriptions with AI-Powered Precision',
  description:
    "Boost your e-commerce sales with Describa's AI-generated product descriptions. Save time, improve SEO, and drive more conversions. Try it now!"
}

const RefundPolicyPage = () => {
  return (
    <div className="relative flex h-screen min-h-dvh w-full flex-col overflow-hidden overflow-y-auto bg-background dark">
      <BasicNavbar />
      <div className="mx-auto mb-10 mt-28 max-w-4xl sm:text-center">
        <h1 className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-foreground sm:text-balance sm:text-5xl">
          Refund Policy
        </h1>
      </div>
      <div className="mx-auto mb-16 w-full max-w-5xl px-6 text-foreground lg:px-8">
        <h2 className={'text-large font-semibold'}>1. Credit Packages</h2>
        <br />
        <div className={'grid grid-cols-1 gap-4 sm:grid-cols-2'}>
          <div className={'pl-4'}>
            <h3 className={'text-large font-semibold'}>
              1.1. Eligible for Refund:
            </h3>
            <ul className={'list-disc space-y-1 pl-4'}>
              <li>Unused credits within 7 days of purchase</li>
              <li>Technical issues preventing service use</li>
              <li>Duplicate charges</li>
            </ul>
          </div>
          <div className={'pl-4'}>
            <h3 className={'text-large font-semibold'}>
              1.2. Not Eligible for Refund:
            </h3>
            <ul className={'list-disc space-y-1 pl-4'}>
              <li>Used credits</li>
              <li>Credits older than 7 days</li>
            </ul>
          </div>
        </div>
        <br />
        <br />
        <h2 className={'text-large font-semibold'}>2. Refund Process</h2>
        <br />
        <div className={'grid grid-cols-1 gap-4 sm:grid-cols-2'}>
          <div className={'pl-4'}>
            <h3 className={'text-large font-semibold'}>
              2.1. To Request a Refund:
            </h3>
            <ul className={'list-disc space-y-1 pl-4'}>
              <li>Contact support@describa.ai</li>
              <li>Include order number and reason</li>
              <li>Allow 3-5 business days for review</li>
            </ul>
          </div>
          <div className={'pl-4'}>
            <h3 className={'text-large font-semibold'}>2.2. Refund Methods:</h3>
            <ul className={'list-disc space-y-1 pl-4'}>
              <li>Original payment method</li>
              <li>Processing time: 5-10 business days</li>
            </ul>
          </div>
        </div>
        <br />
        <br />
        <h2 className={'text-large font-semibold'}>3. Special Circumstances</h2>
        <br />
        <div className={'grid grid-cols-1 gap-4 sm:grid-cols-2'}>
          <div className={'pl-4'}>
            <h3 className={'text-large font-semibold'}>
              3.1. Promotional Credits:
            </h3>
            <ul className={'list-disc space-y-1 pl-4'}>
              <li>Not eligible for refund</li>
              <li>No cash value</li>
            </ul>
          </div>
        </div>
        <br />
        <br />
        <h2 className={'text-large font-semibold'}>4. Disputes</h2>
        <br />
        <div className={'grid grid-cols-1 gap-4 sm:grid-cols-2'}>
          <div className={'pl-4'}>
            <h3 className={'text-large font-semibold'}>
              4.1. Resolution Process:
            </h3>
            <ul className={'list-disc space-y-1 pl-4'}>
              <li>Contact customer support</li>
              <li>Provide detailed information</li>
              <li>Allow 5 business days for response</li>
            </ul>
          </div>
          <div className={'pl-4'}>
            <h3 className={'text-large font-semibold'}>
              4.2. Final Decisions:
            </h3>
            <ul className={'list-disc space-y-1 pl-4'}>
              <li>Made by management team</li>
              <li>Based on policy and circumstances</li>
              <li>Communicated in writing</li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default RefundPolicyPage
