import { Button, Chip } from '@nextui-org/react'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import AppScreenshot from '@/app/(marketing)/_components/app-screenshot'
import BasicNavbar from '@/app/(marketing)/_components/basic-navbar'
import FadeInImage from '@/app/(marketing)/_components/fade-in-image'

export const HeroSection = () => {
  return (
    <>
      <BasicNavbar />
      <main className="flex flex-col items-center rounded-2xl px-3 md:rounded-3xl md:px-0">
        <section className="z-20 my-14 flex flex-col items-center justify-center gap-[18px] sm:gap-6">
          <Chip
            classNames={{
              content: 'font-medium text-primary-500'
            }}
            color="primary"
            variant="flat"
          >
            Save countless hours!
          </Chip>
          <div className="text-center text-[clamp(40px,10vw,44px)] font-bold leading-[1.2] tracking-tighter sm:text-[64px]">
            <h1 className="bg-foreground from-[#FFFFFF] to-[#FFFFFF66] bg-clip-text text-transparent">
              Transform Your Product Descriptions <br />
              into Sales with AI-Powered Writing
            </h1>
          </div>
          <p className="text-center font-normal leading-7 text-default-500 sm:max-w-2xl sm:text-[18px]">
            Create compelling, SEO-optimized product descriptions automatically
            from your product images. Our AI writing assistant helps e-commerce
            businesses save time and increase sales.
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-6">
            <Button
              as={Link}
              href={'/products/new'}
              className="h-10 w-[163px] bg-default-foreground px-[16px] py-[10px] text-small font-medium leading-5 text-background"
              radius="full"
            >
              Get Started for Free
            </Button>
            <Button
              as={Link}
              href={'#pricing'}
              className="h-10 w-[163px] border-1 border-default-100 px-[16px] py-[10px] text-small font-medium leading-5"
              endContent={
                <span className="pointer-events-none flex size-[22px] items-center justify-center rounded-full bg-default-100">
                  <ChevronRight
                    className="text-default-500 [&>path]:stroke-[1.5]"
                    width={16}
                  />
                </span>
              }
              radius="full"
              variant="bordered"
            >
              See our packages
            </Button>
          </div>
        </section>
        <div className="z-20 mt-auto w-[calc(100%-calc(theme(spacing.4)*2))] max-w-6xl overflow-hidden rounded-t-2xl border-1 border-b-0 border-[#FFFFFF1A] bg-background bg-opacity-0 p-4">
          <AppScreenshot />
        </div>
      </main>
      <div className="pointer-events-none inset-0 -top-1/4 z-10 scale-150 select-none sm:absolute sm:scale-125">
        <FadeInImage
          fill
          priority
          alt="Gradient background"
          src="https://nextuipro.nyc3.cdn.digitaloceanspaces.com/components-images/backgrounds/bg-gradient.png"
        />
      </div>
    </>
  )
}
