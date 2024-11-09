'use server'

import { currentUser } from '@clerk/nextjs/server'

import { CREDIT_PACKAGES } from '@/features/users/constants'
import { CreateUserDb } from '@/features/users/db/create-user'
import { getUser } from '@/features/users/db/get-user'

export async function createUser() {
  try {
    const clerkUser = await currentUser()

    if (!clerkUser) {
      throw new Error('No user found')
    }

    // Check if user already exists in our database
    const existingUser = await getUser(clerkUser.id)

    if (existingUser) {
      return { success: true }
    }

    // Create new user with Clerk data
    await CreateUserDb({
      clerkUserId: clerkUser.id,
      currentCredits: CREDIT_PACKAGES.Free.credits
    })

    return { success: true }
  } catch (error) {
    console.error('Error creating user:', error)
    return { success: false, error: 'Failed to create user' }
  }
}
