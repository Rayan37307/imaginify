"use client"

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { navLinks } from "@/constants"
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from '@/components/design-system/utils';
import { Button } from '@/components/design-system/controls';
import { Material } from '@/components/design-system/materials';

const MobileNav = () => {
  const pathname = usePathname();
  const { theme } = useTheme();

  return (
    <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 z-40 flex items-center px-4">
      <Link href="/" className="flex items-center gap-2">
        <Image
          src="/assets/images/logo-text.svg"
          alt="logo"
          width={180}
          height={28}
        />
      </Link>

      <nav className="ml-auto flex gap-2">
        <SignedIn>
          <UserButton afterSignOutUrl="/" />

          <Sheet>
            <SheetTrigger>
              <Image
                src="/assets/icons/menu.svg"
                alt="menu"
                width={24}
                height={24}
                className="cursor-pointer"
              />
            </SheetTrigger>
            <SheetContent className="sm:w-64 w-4/5 p-0">
              <Material material="sheet" theme={theme} className="h-full flex flex-col">
                <div className="p-4 border-b" style={{ borderColor: theme === 'light' ? '#e5e7eb' : '#374151' }}>
                  <Image
                    src="/assets/images/logo-text.svg"
                    alt="logo"
                    width={152}
                    height={23}
                  />
                </div>

                <div className="flex-1 overflow-y-auto p-4">
                  <ul className="space-y-2">
                    {navLinks.map((link) => {
                      const isActive = link.route === pathname

                      return (
                        <li key={link.route}>
                          <Link 
                            className={`flex items-center gap-3 p-3 rounded-lg ${isActive ? 'bg-gray-100 dark:bg-gray-700' : 'hover:bg-gray-50 dark:hover:bg-gray-800'}`}
                            href={link.route}
                          >
                            <Image
                              src={link.icon}
                              alt="logo"
                              width={20}
                              height={20}
                            />
                            <span>{link.label}</span>
                          </Link>
                        </li>
                      )
                    })}
                  </ul>

                  <div className="pt-4 mt-auto border-t" style={{ borderColor: theme === 'light' ? '#e5e7eb' : '#374151' }}>
                    <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                      <div className="w-5 h-5 flex items-center justify-center">
                        <UserButton afterSignOutUrl='/' showName />
                      </div>
                      <span>Account</span>
                    </div>
                  </div>
                </div>
              </Material>
            </SheetContent>
          </Sheet>
        </SignedIn>

        <SignedOut>
          <Link href="/sign-in">
            <Button theme={theme} variant="push">
              Login
            </Button>
          </Link>
        </SignedOut>
      </nav>
    </header>
  )
}

export default MobileNav