'use client'

import { Avatar } from '@/components/avatar'
import {
  Dropdown,
  DropdownButton,
  DropdownDivider,
  DropdownItem,
  DropdownLabel,
  DropdownMenu,
} from '@/components/dropdown'
import { Navbar, NavbarSection, NavbarSpacer } from '@/components/navbar'
import {
  Sidebar,
  SidebarBody,
  SidebarFooter,
  SidebarHeader,
  SidebarItem,
  SidebarLabel,
  SidebarSection,
  SidebarSpacer,
} from '@/components/sidebar'
import { SidebarLayout } from '@/components/sidebar-layout'
import { getEvents } from '@/data'
import { UserButton, useUser } from '@clerk/nextjs'
import {
  AdjustmentsHorizontalIcon,
  ArrowRightStartOnRectangleIcon,
  BarsArrowUpIcon,
  ChatBubbleBottomCenterTextIcon,
  ChevronDownIcon,
  LightBulbIcon,
  PhotoIcon,
  ShieldCheckIcon,
  UserCircleIcon,
} from '@heroicons/react/16/solid'
import {
  CircleStackIcon,
  Cog6ToothIcon,
  HomeIcon,
  QuestionMarkCircleIcon,
  Square2StackIcon,
} from '@heroicons/react/20/solid'
import { usePathname } from 'next/navigation'

function AccountDropdownMenu({ anchor }: { anchor: 'top start' | 'bottom end' }) {
  return (
    <DropdownMenu className="min-w-64" anchor={anchor}>
      <DropdownItem href="#">
        <UserCircleIcon />
        <DropdownLabel>My account</DropdownLabel>
      </DropdownItem>
      <DropdownDivider />
      <DropdownItem href="#">
        <ShieldCheckIcon />
        <DropdownLabel>Privacy policy</DropdownLabel>
      </DropdownItem>
      <DropdownItem href="#">
        <LightBulbIcon />
        <DropdownLabel>Share feedback</DropdownLabel>
      </DropdownItem>
      <DropdownDivider />
      <DropdownItem href="#">
        <ArrowRightStartOnRectangleIcon />
        <DropdownLabel>Sign out</DropdownLabel>
      </DropdownItem>
    </DropdownMenu>
  )
}

export function ApplicationLayout({
  events,
  children,
}: {
  events: Awaited<ReturnType<typeof getEvents>>
  children: React.ReactNode
}) {
  let pathname = usePathname()
  const { user } = useUser()

  return (
    <SidebarLayout
      navbar={
        <Navbar>
          <NavbarSpacer />
          <NavbarSection>
            <UserButton afterSignOutUrl="/" />
          </NavbarSection>
        </Navbar>
      }
      sidebar={
        <Sidebar>
          <SidebarHeader>
            <Dropdown>
              <DropdownButton as={SidebarItem}>
                <Avatar src="/teams/catalyst.svg" />
                <SidebarLabel>Catalyst</SidebarLabel>
                <ChevronDownIcon />
              </DropdownButton>
              {/* <DropdownMenu className="min-w-80 lg:min-w-64" anchor="bottom start">
                <DropdownItem href="/settings">
                  <Cog8ToothIcon />
                  <DropdownLabel>Settings</DropdownLabel>
                </DropdownItem>
                <DropdownDivider />
                <DropdownItem href="#">
                  <Avatar slot="icon" src="/teams/catalyst.svg" />
                  <DropdownLabel>Catalyst</DropdownLabel>
                </DropdownItem>
                <DropdownItem href="#">
                  <Avatar slot="icon" initials="BE" className="bg-purple-500 text-white" />
                  <DropdownLabel>Big Events</DropdownLabel>
                </DropdownItem>
                <DropdownDivider />
                <DropdownItem href="#">
                  <PlusIcon />
                  <DropdownLabel>New team&hellip;</DropdownLabel>
                </DropdownItem>
              </DropdownMenu> */}
            </Dropdown>
          </SidebarHeader>

          <SidebarBody>
            <SidebarSection>
              <SidebarItem href="/app/overview" current={pathname.startsWith('/app/overview')}>
                <HomeIcon />
                <SidebarLabel>Overview</SidebarLabel>
              </SidebarItem>
              <SidebarItem href="/app/text-to-image" current={pathname.startsWith('/app/text-to-image')}>
                <ChatBubbleBottomCenterTextIcon />
                <SidebarLabel>Text to image</SidebarLabel>
              </SidebarItem>
              <SidebarItem href="/app/image-to-image" current={pathname.startsWith('/app/image-to-image')}>
                <PhotoIcon />
                <SidebarLabel>Image to image</SidebarLabel>
              </SidebarItem>
              <SidebarItem href="/app/upscaling" current={pathname.startsWith('/app/upscaling')}>
                <BarsArrowUpIcon />
                <SidebarLabel>Upscaling</SidebarLabel>
              </SidebarItem>
              <SidebarItem href="/app/fine-tuning" current={pathname.startsWith('/app/fine-tuning')}>
                <AdjustmentsHorizontalIcon />
                <SidebarLabel>Fine tuning</SidebarLabel>
              </SidebarItem>

              <SidebarItem href="/app/bgremove" current={pathname.startsWith('/app/bgremove')}>
                <Square2StackIcon />
                <SidebarLabel>Background Remover</SidebarLabel>
              </SidebarItem>
              {/* <SidebarItem href="/settings" current={pathname.startsWith('/settings')}>
                <Cog6ToothIcon />
                <SidebarLabel>Settings</SidebarLabel>
              </SidebarItem> */}
            </SidebarSection>

            {/* <SidebarSection className="max-lg:hidden">
              <SidebarHeading>Upcoming Events</SidebarHeading>
              {events.map((event) => (
                <SidebarItem key={event.id} href={event.url}>
                  {event.name}
                </SidebarItem>
              ))}
            </SidebarSection> */}

            <SidebarSpacer />

            <SidebarSection>
              <SidebarItem href="/app/models" current={pathname.startsWith('/app/models')}>
                <CircleStackIcon />
                <SidebarLabel>Models</SidebarLabel>
              </SidebarItem>
              <SidebarItem href="#">
                <QuestionMarkCircleIcon />
                <SidebarLabel>Support</SidebarLabel>
              </SidebarItem>
              <SidebarItem href="/app/settings" current={pathname.startsWith('/app/settings')}>
                <Cog6ToothIcon />
                <SidebarLabel>Settings</SidebarLabel>
              </SidebarItem>
            </SidebarSection>
          </SidebarBody>

          <SidebarFooter className="max-lg:hidden">
            {user && (
              <SidebarItem>
                <span className="flex min-w-0 items-center gap-3">
                  <UserButton afterSignOutUrl="/" />
                  <span className="min-w-0">
                    <span className="block truncate text-sm/5 font-medium text-zinc-950 dark:text-white">
                      {user.fullName}
                    </span>
                    <span className="block truncate text-xs/5 font-normal text-zinc-500 dark:text-zinc-400">
                      {user.primaryEmailAddress?.emailAddress}
                    </span>
                  </span>
                </span>
              </SidebarItem>
            )}
          </SidebarFooter>
        </Sidebar>
      }
    >
      {children}
    </SidebarLayout>
  )
}
