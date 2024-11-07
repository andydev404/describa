import BasicNavbar from '@/app/(marketing)/_components/basic-navbar'
import { Footer } from '@/app/(marketing)/_components/sections/footer'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title:
    'Privacy Policy | Transform Product Descriptions with AI-Powered Precision',
  description:
    "Boost your e-commerce sales with Describa's AI-generated product descriptions. Save time, improve SEO, and drive more conversions. Try it now!"
}

const PrivacyPolicyPage = () => {
  return (
    <div className="relative flex h-screen min-h-dvh w-full flex-col overflow-hidden overflow-y-auto bg-background dark">
      <BasicNavbar />
      <div className="mx-auto mb-10 mt-28 max-w-4xl sm:text-center">
        <h1 className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-foreground sm:text-balance sm:text-5xl">
          Privacy Policy
        </h1>
      </div>
      <div className="mx-auto mb-16 w-full max-w-5xl px-6 text-foreground lg:px-8">
        <h2 className={'text-large font-semibold'}>
          1. Information We Collect
        </h2>
        <br />
        <div className={'grid grid-cols-1 gap-4 sm:grid-cols-2'}>
          <div className={'pl-4'}>
            <h3 className={'text-large font-semibold'}>
              1.1. Information You Provide:
            </h3>
            <ul className={'list-disc space-y-1 pl-4'}>
              <li>Account information (name, email, company details)</li>
              <li>Payment information</li>
              <li>Product images and descriptions</li>
              <li>Custom preferences and settings</li>
            </ul>
          </div>
          <div className={'pl-4'}>
            <h3 className={'text-large font-semibold'}>
              1.2. Automatically Collected Information:
            </h3>
            <ul className={'list-disc space-y-1 pl-4'}>
              <li>Usage data</li>
              <li>Device information</li>
              <li>IP addresses</li>
              <li>Cookies and similar technologies</li>
            </ul>
          </div>
        </div>
        <br />
        <br />
        <h2 className={'text-large font-semibold'}>
          2. How We Use Your Information
        </h2>
        <br />
        <div className={'grid grid-cols-1 gap-4 sm:grid-cols-2'}>
          <div className={'pl-4'}>
            <h3 className={'text-large font-semibold'}>2.1. Primary Uses:</h3>
            <ul className={'list-disc space-y-1 pl-4'}>
              <li>Providing and improving the Service</li>
              <li>Processing payments</li>
              <li>Customer support</li>
              <li>Communication about service updates</li>
            </ul>
          </div>
          <div className={'pl-4'}>
            <h3 className={'text-large font-semibold'}>2.2. Secondary Uses:</h3>
            <ul className={'list-disc space-y-1 pl-4'}>
              <li>Service optimization</li>
              <li>Analytics</li>
              <li>Marketing (with consent)</li>
              <li>Legal compliance</li>
            </ul>
          </div>
        </div>
        <br />
        <br />
        <h2 className={'text-large font-semibold'}>
          3. Data Sharing and Disclosure
        </h2>
        <br />
        <div className={'grid grid-cols-1 gap-4 sm:grid-cols-2'}>
          <div className={'pl-4'}>
            <h3 className={'text-large font-semibold'}>
              3.1. We share data with:
            </h3>
            <ul className={'list-disc space-y-1 pl-4'}>
              <li>Service providers (hosting, payment processing)</li>
              <li>Legal authorities when required</li>
              <li>Business partners (with consent)</li>
            </ul>
          </div>
          <h3 className={'text-large font-semibold'}>
            3.2. We do not sell your personal data.
          </h3>
        </div>
        <br />
        <br />
        <h2 className={'text-large font-semibold'}>4. Data Security</h2>
        <br />
        <div className={'grid grid-cols-1 gap-4 sm:grid-cols-2'}>
          <h3 className={'text-large font-semibold'}>
            4.1. We implement industry-standard security measures.
          </h3>
          <h3 className={'text-large font-semibold'}>
            4.2. Data is encrypted in transit and at rest.
          </h3>
          <h3 className={'text-large font-semibold'}>
            4.3. Regular security audits are performed.
          </h3>
        </div>
        <br />
        <br />
        <h2 className={'text-large font-semibold'}>5. Your Rights</h2>
        <br />
        <div className={'pl-4'}>
          <h3 className={'text-large font-semibold'}>
            5.1. You have the right to:
          </h3>
          <ul className={'list-disc space-y-1 pl-4'}>
            <li>Access your data</li>
            <li>Correct inaccurate data</li>
            <li>Request data deletion</li>
            <li>Export your data</li>
            <li>Withdraw consent</li>
          </ul>
        </div>
        <br />
        <br />
        <h2 className={'text-large font-semibold'}>6. Data Retention</h2>
        <br />
        <div className={'pl-4'}>
          <h3 className={'text-large font-semibold'}>
            6.1. We retain data for:
          </h3>
          <ul className={'list-disc space-y-1 pl-4'}>
            <li>Active accounts: Duration of service</li>
            <li>Closed accounts: 90 days</li>
            <li>Financial records: 7 years (legal requirement)</li>
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default PrivacyPolicyPage
