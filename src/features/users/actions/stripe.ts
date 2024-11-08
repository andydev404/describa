'use server'

import { headers } from 'next/headers'
import Stripe from 'stripe'

import { env } from '@/app/data/env/server'

const stripe = new Stripe(env.STRIPE_SECRET_KEY)

interface ICreateCheckoutSession {
  priceId: string
  customerEmail: string
  credits: number
  userId: string
}

export async function createCheckoutSession({
  customerEmail,
  credits,
  priceId,
  userId
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
          price: priceId,
          quantity: 1
        }
      ],
      mode: 'payment',
      success_url: `${origin}/billing?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/billing?canceled=true`
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
