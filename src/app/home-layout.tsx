'use client'

import { Navbar, NavbarSection, NavbarSpacer } from '@/components/navbar'
import { StackedLayout } from '@/components/stacked-layout'
import { getEvents } from '@/data'
import { UserButton, useUser } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'

export function HomeLayout({ children }: { events: Awaited<ReturnType<typeof getEvents>>; children: React.ReactNode }) {
  let pathname = usePathname()
  const { user } = useUser()

  const navbar = (
    <Navbar>
      <NavbarSpacer />
      <NavbarSection>
        <UserButton afterSignOutUrl="/" />
      </NavbarSection>
    </Navbar>
  )

  return <StackedLayout navbar={navbar}>{children}</StackedLayout>
}
