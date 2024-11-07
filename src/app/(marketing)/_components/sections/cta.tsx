import { Button } from '@nextui-org/react'
import { Check } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const benefits = [
  'Boost search rankings',
  'Increase conversion rates',
  'Save countless hours',
  'Scale your business'
]

export const Cta = () => {
  return (
    <div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
      <div className="relative isolate overflow-hidden border border-default-100 bg-white/5 px-6 py-24 text-center shadow-2xl sm:rounded-3xl sm:px-16">
        <h2 className="text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          Start Generating AI Product Descriptions Today
        </h2>
        <p className="mx-auto mt-6 text-pretty text-lg/8 text-default-500">
          Transform your e-commerce content strategy with AI-powered product
          descriptions.
        </p>
        <ul
          role="list"
          className="mx-auto mt-10 grid max-w-xl grid-cols-1 gap-x-8 gap-y-3 text-base/7 text-default-500 sm:grid-cols-2"
        >
          {benefits.map(benefit => (
            <li key={benefit} className="flex gap-x-3">
              <Check aria-hidden="true" className="h-7 w-5 flex-none" />
              {benefit}
            </li>
          ))}
        </ul>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button
            href={'/products/new'}
            as={Link}
            className="h-10 w-[163px] bg-default-foreground px-[16px] py-[10px] text-small font-medium leading-5 text-background"
            radius="full"
          >
            Get Started for Free
          </Button>
        </div>
      </div>
    </div>
  )
}
