'use client'

import { UserButton, useUser } from '@clerk/nextjs'
import { Disclosure } from '@headlessui/react'
import React, { useState } from 'react'

export function StackedLayout({ navbar, children }: React.PropsWithChildren<{ navbar: React.ReactNode }>) {
  let [showSidebar, setShowSidebar] = useState(false)
  const { user } = useUser()

  return (
    <div className="relative isolate flex min-h-svh w-full flex-col bg-white lg:bg-zinc-100 dark:bg-zinc-900 dark:lg:bg-zinc-950">
      {/* Navbar */}
      <header className="flex items-center px-4">
        <Disclosure as="nav" className="w-full bg-transparent">
          {({ open }) => (
            <>
              <div className="mx-auto px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                  <div className="absolute inset-y-0 left-0 flex items-center sm:hidden"></div>
                  <div className="flex flex-1 items-center justify-between sm:items-stretch">
                    <div className="flex flex-shrink-0 items-center">
                      <img
                        className="h-8 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Your Company"
                      />
                    </div>
                    <div className="hidden sm:ml-6 sm:block">
                      <div className="flex space-x-4">{/* Add your navigation items here if needed */}</div>
                    </div>
                    {/* User Button */}
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                      {user && <UserButton afterSignOutUrl="/" />}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </Disclosure>
      </header>

      {/* Content */}
      <main className="flex flex-1 flex-col pb-2 lg:px-2">
        <div className="grow p-6 lg:rounded-lg lg:bg-white lg:p-10 lg:shadow-sm lg:ring-1 lg:ring-zinc-950/5 dark:lg:bg-zinc-900 dark:lg:ring-white/10">
          <div className="mx-auto max-w-6xl">{children}</div>
        </div>
      </main>
    </div>
  )
}
