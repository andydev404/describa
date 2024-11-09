import { auth } from '@clerk/nextjs/server'
import { SetUserIdServerComponent } from '@logsnag/next'
import { redirect } from 'next/navigation'
import { ReactNode } from 'react'

import DashboardLayout from '@/app/(dashboard)/_components/dashboard-layout'
import { getCatalogs } from '@/features/catalogs/actions/get-catalogs'
import { getUser } from '@/features/users/db/get-user'
import Crisp from '@/lib/crisp'

export default async function Layout({ children }: { children: ReactNode }) {
  const { userId } = await auth()

  if (!userId) {
    return redirect('/setup-account')
  }

  const user = await getUser(userId)
  if (!user) {
    return redirect('/setup-account')
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
