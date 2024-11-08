import { WebhookEvent } from '@clerk/nextjs/server'
import { headers } from 'next/headers'
import { Resend } from 'resend'
import { Webhook } from 'svix'

import { env } from '@/app/data/env/server'
import { CREDIT_PACKAGES } from '@/features/users/constants'
import { CreateUserDb } from '@/features/users/db/create-user'
import { deleteUser } from '@/features/users/db/delete-user'
import { WelcomeEmail } from '@/features/users/emails/welcome'

const resend = new Resend(env.RESEND_API_KEY)

export async function POST(req: Request) {
  const headerPayload = await headers()
  const svixId = headerPayload.get('svix-id')
  const svixTimestamp = headerPayload.get('svix-timestamp')
  const svixSignature = headerPayload.get('svix-signature')

  if (!svixId || !svixTimestamp || !svixSignature) {
    return new Response('Error occurred -- no svix headers', {
      status: 400
    })
  }

  const payload = await req.json()
  const body = JSON.stringify(payload)

  const wh = new Webhook(env.CLERK_WEBHOOK_SECRET)
  let event: WebhookEvent

  try {
    event = wh.verify(body, {
      'svix-id': svixId,
      'svix-timestamp': svixTimestamp,
      'svix-signature': svixSignature
    }) as WebhookEvent
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return new Response('Error occurred', {
      status: 400
    })
  }

  switch (event.type) {
    case 'user.created': {
      await CreateUserDb({
        clerkUserId: event.data.id,
        currentCredits: CREDIT_PACKAGES.Free.credits
      })
      await resend.emails.send({
        from: `Andy from Describa <andy@describa.ai>`,
        to: event.data.email_addresses[0].email_address,
        subject: `Welcome to Describa! Let's Create Amazing Product Descriptions 🚀`,
        react: WelcomeEmail()
      })

      break
    }
    case 'user.deleted': {
      if (event.data.id != null) {
        await deleteUser(event.data.id)
      }
    }
  }

  return new Response('', { status: 200 })
}
