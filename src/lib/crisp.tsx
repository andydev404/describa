'use client'

import { useUser } from '@clerk/nextjs'
import { Crisp } from 'crisp-sdk-web'
import { useEffect } from 'react'

import { env } from '@/app/data/env/client'

const CrispScript = () => {
  const { isLoaded, isSignedIn, user } = useUser()

  useEffect(() => {
    if (!isLoaded || !isSignedIn) return

    Crisp.configure(env.NEXT_PUBLIC_CRISP_KEY)
    Crisp.user.setEmail(user?.primaryEmailAddress?.emailAddress || '')
    Crisp.user.setNickname(user?.fullName || '')

    Crisp.session.setData({
      user_id: user?.id || ''
    })
  }, [isLoaded, isSignedIn])

  return null
}

export default CrispScript
