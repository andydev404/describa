import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { ReactNode } from 'react'

import DashboardLayout from '@/app/(dashboard)/_components/dashboard-layout'
import { getCatalogs } from '@/features/catalogs/actions/get-catalogs'
import { getUser } from '@/features/users/db/get-user'
import Crisp from '@/lib/crisp'

export default async function Layout({ children }: { children: ReactNode }) {
  const { userId } = auth()

  if (!userId) redirect('/')

  const user = await getUser(userId)
  if (!user) redirect('/')

  const catalogs = await getCatalogs()

  return (
    <DashboardLayout
      catalogs={catalogs}
      currentUserCredits={user.currentCredits}
    >
      <Crisp />
      {children}
    </DashboardLayout>
  )
}
