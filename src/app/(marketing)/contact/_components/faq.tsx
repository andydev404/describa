'use client'

import { Accordion, AccordionItem } from '@nextui-org/react'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    title: 'How quickly can I start using Describa?',
    content:
      'Instantly! Sign up and generate your first description in under 2 minutes.'
  },
  {
    title: 'Do you offer custom solutions?',
    content:
      'Yes, our Enterprise team can tailor solutions for your specific needs.'
  },
  {
    title: 'What if I need more credits?',
    content: 'Simply purchase additional credits from your dashboard.'
  },
  {
    title: 'Is there a long-term contract?',
    content:
      'No, our packages are flexible with no long-term commitment required.'
  }
]

export const Faq = () => {
  return (
    <section className="mx-auto max-w-7xl px-6 lg:px-8" id={'faq'}>
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-6">
        <div className="mx-auto mb-16 max-w-2xl sm:text-center">
          <p className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-foreground sm:text-balance sm:text-5xl">
            Frequently Asked Questions
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
