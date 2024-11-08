import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Tailwind,
  Text
} from '@react-email/components'
import * as React from 'react'

const steps = [
  {
    id: 1,
    Description: (
      <li className="mb-20" key={1}>
        <strong>Upload your first product image</strong>
      </li>
    )
  },
  {
    id: 2,
    Description: (
      <li className="mb-20" key={2}>
        <strong>Customize your brand voice settings</strong>
      </li>
    )
  },
  {
    id: 3,
    Description: (
      <li className="mb-20" key={3}>
        <strong>Generate your first AI-powered description</strong>
      </li>
    )
  }
]

export const WelcomeEmail = () => {
  return (
    <Html>
      <Head />
      <Preview>
        Thank you for choosing Describa! We&#39;re excited to help you transform
        your product images into compelling, SEO-optimized descriptions that
        drive sales.
      </Preview>
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                brand: '#2250f4',
                offwhite: '#fafbfb'
              },
              spacing: {
                0: '0px',
                20: '20px',
                45: '45px'
              }
            }
          }
        }}
      >
        <Body className="bg-offwhite font-sans text-base">
          <Img
            src={`https://utfs.io/f/gzOTTZHX3WMAwrIrlhfqukbIj36nmVyBrUOEA9ixdWlvcFMf`}
            width="110"
            height="110"
            alt="Describa"
            className="mx-auto my-20"
          />
          <Container className="p-45 bg-white">
            <Heading className="my-0 text-center leading-8">
              Welcome to Describa! 🎉
            </Heading>

            <Section>
              <Row>
                <Text className="text-base">
                  Thank you for choosing Describa! We&#39;re excited to help you
                  transform your product images into compelling, SEO-optimized
                  descriptions that drive sales.
                </Text>

                <Text className="text-base">
                  Get Started in 3 Simple Steps:
                </Text>
              </Row>
            </Section>

            <ul>{steps?.map(({ Description }) => Description)}</ul>

            <Text className="mb-8 text-base">
              Ready to begin? Visit your dashboard.
            </Text>
            <Text className="mb-4 text-base">
              Need Help? email us at: support@describa.com
            </Text>

            <Text className="text-base">Best regards, The Describa Team</Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

export default WelcomeEmail
