import { RedirectToSignIn } from '@clerk/nextjs'
import { auth } from '@clerk/nextjs/server'
import { SetUserIdServerComponent } from '@logsnag/next'
import { ReactNode } from 'react'

import DashboardLayout from '@/app/(dashboard)/_components/dashboard-layout'
import { getCatalogs } from '@/features/catalogs/actions/get-catalogs'
import { getUser } from '@/features/users/db/get-user'
import Crisp from '@/lib/crisp'

export default async function Layout({ children }: { children: ReactNode }) {
  const { userId } = await auth()

  if (!userId) {
    return <RedirectToSignIn />
  }

  const user = await getUser(userId)
  if (!user) {
    return <RedirectToSignIn />
  }

  const catalogs = await getCatalogs()

  return (
    <DashboardLayout
      catalogs={catalogs}
      currentUserCredits={user.currentCredits}
    >
      <SetUserIdServerComponent userId={userId} />
      <Crisp />
      {children}
    </DashboardLayout>
  )
}
