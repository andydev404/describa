'use server'

import { headers } from 'next/headers'
import Stripe from 'stripe'

import { env } from '@/app/data/env/server'
import { dollarToCents } from '@/features/products/utils'

const stripe = new Stripe(env.STRIPE_SECRET_KEY)

interface ICreateCheckoutSession {
  customerEmail: string
  credits: number
  userId: string
  productName: string
  productDescription: string
  price: number
}

export async function createCheckoutSession({
  customerEmail,
  credits,
  userId,
  productName,
  productDescription,
  price
}: ICreateCheckoutSession) {
  const headersList = await headers()
  const protocol = headersList.get('x-forwarded-proto') || 'http'
  const host = headersList.get('host')
  const origin = `${protocol}://${host}`

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer_email: customerEmail,
      metadata: {
        credits,
        userId
      },
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: 'USD',
            product_data: {
              name: `Describa ${productName} - ${credits} credits`,
              description: productDescription,
              images: [
                'https://utfs.io/f/gzOTTZHX3WMAwrIrlhfqukbIj36nmVyBrUOEA9ixdWlvcFMf'
              ]
            },
            unit_amount: dollarToCents(price)
          }
        }
      ],
      mode: 'payment',
      success_url: `${origin}/billing?success`,
      cancel_url: `${origin}/billing`
    })

    return { sessionId: session.id }
  } catch (error) {
    console.error('Error:', error)
    throw new Error('Failed to create checkout session')
  }
}

export async function getSessionDetails(sessionId: string) {
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items']
    })
    console.log({ session })
    return session
  } catch (error) {
    console.error('Error:', error)
    throw new Error('Failed to get session')
  }
}
