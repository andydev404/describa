import Image from 'next/image'

export const MeetDescriba = () => {
  return (
    <div className="py-24 sm:py-32" id={'features'}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl sm:text-center">
          <p className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-foreground sm:text-balance sm:text-5xl">
            Everything You Need for E-commerce Success
          </p>
          <p className="mt-6 text-lg/8 text-default-500">
            Meet your new AI content creation partner. Our advanced artificial
            intelligence technology generates conversion-focused product
            descriptions that drive sales and improve search rankings. Upload
            product images and watch as our AI transforms them into compelling
            content.
          </p>
        </div>
      </div>
      <div className="relative overflow-hidden pt-16">
        <div className="mx-auto w-full max-w-2xl px-6 lg:px-8">
          <Image
            src="https://utfs.io/f/gzOTTZHX3WMAmtTcmbXEDZvAULcbsXwWjyudT598C2nRoit3"
            alt="Features"
            className="rounded-xl object-cover"
            width={1920}
            height={600}
          />
        </div>
      </div>
    </div>
  )
}
