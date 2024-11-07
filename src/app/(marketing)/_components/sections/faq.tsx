'use client'

import { Accordion, AccordionItem } from '@nextui-org/react'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    title: 'How fast is Describa?',
    content:
      "Upload an image, get a description in under 10 seconds. It's that simple."
  },
  {
    title: 'Can I maintain my brand voice?',
    content:
      'Yes! Fine-tune tone, style, and formatting to match your brand perfectly.'
  },
  {
    title: 'Will this help my SEO?',
    content:
      'Absolutely. Every description is crafted with search optimization in mind, helping you rank higher naturally.'
  },
  {
    title: 'Can I use the descriptions anywhere?',
    content:
      'Yes! Use them across all your sales channels - website, marketplaces, social media, and marketing materials.'
  },
  {
    title: 'Is my data secure?',
    content:
      'Your content is protected with bank-grade encryption. Your business data never leaves our secure servers.'
  }
]

export const Faq = () => {
  return (
    <section className="mx-auto max-w-7xl px-6 lg:px-8" id={'faq'}>
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-6">
        <div className="mx-auto mb-16 max-w-2xl sm:text-center">
          <p className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-foreground sm:text-balance sm:text-5xl">
            Common Questions, Clear Answers
          </p>
        </div>
        <Accordion
          fullWidth
          keepContentMounted
          className="gap-3"
          itemClasses={{
            base: 'px-6 !bg-transparent hover:!bg-default-100 !shadow-none data-[open=true]:!bg-default-100',
            title: 'font-medium',
            trigger: 'py-4 md:py-6',
            content: 'pt-0 pb-6 text-base text-default-500',
            indicator: 'data-[open=true]:rotate-180'
          }}
          items={faqs}
          selectionMode="multiple"
          variant="splitted"
        >
          {faqs.map((item, i) => (
            <AccordionItem
              key={i}
              indicator={<ChevronDown width={24} />}
              title={item.title}
            >
              {item.content}
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
