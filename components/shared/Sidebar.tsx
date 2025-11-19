"use client"

import { navLinks } from '@/constants'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from '@/components/design-system/utils';
import { Sidebar as MacOSSidebar, SidebarItem } from '@/components/design-system/window';
import { Button } from '@/components/design-system/controls';

const Sidebar = () => {
  const pathname = usePathname();
  const { theme } = useTheme();

  return (
    <MacOSSidebar theme={theme} width="240px">
      <Link href="/" className="flex items-center gap-2 py-4">
        <Image src="/assets/images/logo-text.svg" alt="logo" width={180} height={28} />
      </Link>

      <nav className="flex-1">
        <SignedIn>
          <div className="space-y-1">
            {navLinks.slice(0, 6).map((link) => {
              const isActive = link.route === pathname

              return (
                <Link key={link.route} href={link.route}>
                  <SidebarItem 
                    theme={theme} 
                    isActive={isActive}
                    icon={
                      <Image
                        src={link.icon}
                        alt="logo"
                        width={20}
                        height={20}
                      />
                    }
                  >
                    {link.label}
                  </SidebarItem>
                </Link>
              )
            })}
          </div>

          <div className="mt-4 space-y-1">
            {navLinks.slice(6).map((link) => {
              const isActive = link.route === pathname

              return (
                <Link key={link.route} href={link.route}>
                  <SidebarItem 
                    theme={theme} 
                    isActive={isActive}
                    icon={
                      <Image
                        src={link.icon}
                        alt="logo"
                        width={20}
                        height={20}
                      />
                    }
                  >
                    {link.label}
                  </SidebarItem>
                </Link>
              )
            })}
          </div>

          <div className="pt-4 mt-auto border-t border-gray-200 dark:border-gray-700">
            <SidebarItem 
              theme={theme} 
              icon={
                <div className="w-5 h-5 flex items-center justify-center">
                  <UserButton afterSignOutUrl='/' showName />
                </div>
              }
            >
              Account
            </SidebarItem>
          </div>
        </SignedIn>

        <SignedOut>
          <Link href="/sign-in">
            <Button theme={theme} variant="push" className="w-full">
              Login
            </Button>
          </Link>
        </SignedOut>
      </nav>
    </MacOSSidebar>
  )
}

export default Sidebar