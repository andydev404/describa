import { Button, Image } from '@nextui-org/react'
import Link from 'next/link'

export const HowItWorks = () => {
  return (
    <>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base/7 font-semibold text-primary">
            How Describa Works
          </h2>
          <p className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-balance">
            Getting Started is Simple
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div className="aspect-w-16 aspect-h-9 lg:aspect-none">
            <Image
              className="w-full rounded-xl object-cover"
              src="https://utfs.io/f/gzOTTZHX3WMAWh7N11Tj82kz3gCuXVJ4alUfAebQxsyS07iH"
              alt="Features Image"
            />
          </div>

          <div>
            <div className="mb-4">
              <h3 className="text-small font-medium uppercase text-primary">
                Steps
              </h3>
            </div>

            <div className="ms-1 flex gap-x-5">
              <div className="relative after:absolute after:bottom-0 after:start-4 after:top-8 after:w-px after:-translate-x-[0.5px] after:bg-neutral-800 last:after:hidden">
                <div className="relative z-10 flex size-8 items-center justify-center">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-primary bg-primary-50 text-xs font-semibold uppercase text-primary">
                    1
                  </span>
                </div>
              </div>

              <div className="grow pb-8 pt-0.5 sm:pb-12">
                <p className="text-sm text-default-500 lg:text-base">
                  <span className="font-semibold text-foreground">
                    Upload Your Product Images:{' '}
                  </span>
                  Our AI analyzes your product images to understand features and
                  unique selling points.
                </p>
              </div>
            </div>

            <div className="ms-1 flex gap-x-5">
              <div className="relative after:absolute after:bottom-0 after:start-4 after:top-8 after:w-px after:-translate-x-[0.5px] after:bg-neutral-800 last:after:hidden">
                <div className="relative z-10 flex size-8 items-center justify-center">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-primary bg-primary-50 text-xs font-semibold uppercase text-primary">
                    2
                  </span>
                </div>
              </div>

              <div className="grow pb-8 pt-0.5 sm:pb-12">
                <p className="text-sm text-default-500 lg:text-base">
                  <span className="font-semibold text-foreground">
                    Select Your Preferences:{' '}
                  </span>
                  Choose languages, tone, SEO keywords, and any additional
                  features you need.
                </p>
              </div>
            </div>

            <div className="ms-1 flex gap-x-5">
              <div className="relative after:absolute after:bottom-0 after:start-4 after:top-8 after:w-px after:-translate-x-[0.5px] after:bg-neutral-800 last:after:hidden">
                <div className="relative z-10 flex size-8 items-center justify-center">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-primary bg-primary-50 text-xs font-semibold uppercase text-primary">
                    3
                  </span>
                </div>
              </div>

              <div className="grow pb-8 pt-0.5 sm:pb-12">
                <p className="text-sm text-default-500 md:text-base">
                  <span className="font-semibold text-foreground">
                    Generate:{' '}
                  </span>
                  Receive your AI-generated descriptions instantly.
                </p>
              </div>
            </div>

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
    </>
  )
}
