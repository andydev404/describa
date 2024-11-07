'use client'

import { Accordion, AccordionItem, Spacer, Tab, Tabs } from '@nextui-org/react'
import { Facebook, Instagram, Mail, NotepadText, Text } from 'lucide-react'
import { useMemo } from 'react'

import { AiLoading } from '@/app/(dashboard)/_components/ai-loading'
import { MachineTextAnimation } from '@/app/(dashboard)/_components/machine-text-animation'
import { DescriptionEditor } from '@/app/(dashboard)/products/[id]/_components/description-editor'
import { EmailTemplate } from '@/app/(dashboard)/products/[id]/_components/email-template'
import { FacebookPost } from '@/app/(dashboard)/products/[id]/_components/social-media/facebook-post'
import { InstagramPost } from '@/app/(dashboard)/products/[id]/_components/social-media/instagram-post'
import { useBoundStore } from '@/app.store'
import { type Product, type ProductDescription } from '@/drizzle/schema'
import { useProductDetails } from '@/features/products/hooks/use-product-details'
import { EditorJsGenerator } from '@/lib/editorjs-generator'

type Props = Product & { productDescription: ProductDescription }

export const ProductDetails = ({
  productDescription,
  images,
  features
}: Props) => {
  const creatingProduct = useBoundStore(state => state.creatingProduct)
  const generator = new EditorJsGenerator()

  const { isMultilingual, product, LanguageSelector } = useProductDetails(
    features,
    productDescription
  )

  const initialEditorData = useMemo(
    () => generator.convertProductData(product, images[0].url),
    [product]
  )
  const instagramContent = product?.social_media?.instagram
  const facebookContent = product?.social_media?.facebook
  const emailContent = product?.email_marketing
  const feedbackContent = product?.performance_indicators

  if (creatingProduct) {
    return (
      <div className={'mt-12 flex flex-col items-center space-y-6'}>
        <MachineTextAnimation
          value={'Crafting the description... Thank you for your patience.'}
        />
        <AiLoading />
      </div>
    )
  }
  return (
    <>
      {isMultilingual && <LanguageSelector />}
      <Tabs
        aria-label="Options"
        classNames={{
          cursor: 'bg-foreground',
          tabContent: 'group-data-[selected=true]:text-background font-medium',
          panel: 'w-full flex-1'
        }}
      >
        <Tab
          key="description"
          title={
            <div className="flex items-center space-x-2">
              <Text />
              <span>Description</span>
            </div>
          }
        >
          <DescriptionEditor initialContent={initialEditorData || undefined} />
        </Tab>
        {instagramContent && (
          <Tab
            key="instagram"
            title={
              <div className="flex items-center space-x-2">
                <Instagram />
                <span>Instagram</span>
              </div>
            }
          >
            <Spacer y={8} />
            <InstagramPost content={instagramContent} image={images[0].url} />
          </Tab>
        )}
        {facebookContent && (
          <Tab
            key="facebook"
            title={
              <div className="flex items-center space-x-2">
                <Facebook />
                <span>Facebook</span>
              </div>
            }
          >
            <Spacer y={8} />
            <FacebookPost content={facebookContent} image={images[0].url} />
          </Tab>
        )}
        {emailContent && (
          <Tab
            key="email"
            title={
              <div className="flex items-center space-x-2">
                <Mail />
                <span>Email template</span>
              </div>
            }
          >
            <Spacer y={8} />
            <EmailTemplate
              subject={emailContent.subject_line}
              body={emailContent.body}
            />
          </Tab>
        )}
        {feedbackContent && (
          <Tab
            key="insights"
            title={
              <div className="flex items-center space-x-2">
                <NotepadText />
                <span>Insights</span>
              </div>
            }
          >
            <Spacer y={8} />
            <Accordion
              selectionMode="multiple"
              variant="splitted"
              defaultExpandedKeys={['1', '2']}
              className={'mx-auto max-w-xl'}
              itemClasses={{
                title: 'font-semibold'
              }}
            >
              <AccordionItem
                key="1"
                aria-label="Accordion 1"
                title="Effectiveness factors"
              >
                <ul className={'list-disc space-y-2 px-4 pb-4'}>
                  {feedbackContent.effectiveness_factors.map(t => (
                    <li key={t}>{t}.</li>
                  ))}
                </ul>
              </AccordionItem>
              <AccordionItem
                key="2"
                aria-label="Accordion 2"
                title="Conversion elements"
              >
                <ul className={'list-disc space-y-2 px-4 pb-4'}>
                  {feedbackContent.conversion_elements.map(t => (
                    <li key={t}>{t}.</li>
                  ))}
                </ul>
              </AccordionItem>
            </Accordion>
          </Tab>
        )}
      </Tabs>
    </>
  )
}
