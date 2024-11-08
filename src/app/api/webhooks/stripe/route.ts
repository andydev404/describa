import { headers } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

import { env } from '@/app/data/env/server'
import { CreateBillingHistoryDb } from '@/features/billing-history/db/create-billing-history'

import type { NewBillingHistory } from '@/drizzle/schema'

const stripe = new Stripe(env.STRIPE_SECRET_KEY)
const webhookSecret = env.STRIPE_WEBHOOK_SECRET

export async function POST(request: NextRequest) {
  const payload = await request.text()
  const headerPayload = await headers()

  const signature = headerPayload.get('stripe-signature') as string

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(payload, signature, webhookSecret)
  } catch (err) {
    console.error('Webhook signature verification failed.', err)
    return NextResponse.json(
      { error: 'Webhook signature verification failed.' },
      { status: 400 }
    )
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object
      const paymentIntentId = session.payment_intent as string
      const payment = await stripe.paymentIntents.retrieve(paymentIntentId)

      const billingData: NewBillingHistory = {
        clerkUserId: String(session.metadata?.userId),
        status: 'Completed',
        paddleTransactionId: payment.id,
        amount: parseFloat(String(payment.amount / 100)).toString(),
        credits: Number(session.metadata?.credits)
      }
      await CreateBillingHistoryDb(billingData)

      break
    }
    default:
      console.log(`Unhandled event type ${event.type}`)
  }

  return new Response(null, { status: 200 })
}
