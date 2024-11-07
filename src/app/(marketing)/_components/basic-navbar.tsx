'use client'

import { Icon } from '@iconify/react'
import {
  Button,
  cn,
  Divider,
  Link as LinkUI,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle
} from '@nextui-org/react'
import { Text } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

import type { NavbarProps } from '@nextui-org/react'

const BasicNavbar = React.forwardRef<HTMLElement, NavbarProps>(
  ({ classNames = {}, ...props }, ref) => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false)
    const pathname = usePathname()
    const currentPath = pathname.split('/')?.[1]

    const menuItems = [
      { title: 'Home', href: currentPath !== '/' ? '/' : '#home' },
      { title: 'Features', href: '#features' },
      { title: 'Pricing', href: '#pricing' },
      { title: 'Faq', href: '#faq' },
      { title: 'Contact', href: '/contact' }
    ]

    return (
      <Navbar
        ref={ref}
        {...props}
        id={'home'}
        classNames={{
          base: cn('border-default-100 bg-transparent', {
            'bg-background': isMenuOpen
          }),
          wrapper: 'w-full justify-center',
          item: 'hidden md:flex',
          ...classNames
        }}
        height="60px"
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
      >
        {/* Left Content */}
        <NavbarBrand>
          <Link href={'/'} className={'flex items-center gap-1'}>
            <Text className={'text-foreground'} />
            <span className="ml-2 text-large font-semibold text-foreground">
              Describa
            </span>
          </Link>
        </NavbarBrand>

        {/* Center Content */}
        <NavbarContent justify="center">
          {menuItems.map((item, i) => (
            <NavbarItem
              key={i}
              isActive={false}
              className="data-[active='true']:font-medium[date-active='true']"
            >
              <LinkUI
                as={Link}
                aria-current="page"
                className="text-default-foreground"
                href={item.href}
              >
                {item.title}
              </LinkUI>
            </NavbarItem>
          ))}
        </NavbarContent>

        {/* Right Content */}
        <NavbarContent className="hidden md:flex" justify="end">
          <NavbarItem className="ml-2 !flex gap-2">
            <Button
              as={Link}
              href={'/sign-in'}
              className="text-default-500"
              radius="full"
              variant="light"
            >
              Login
            </Button>
            <Button
              className="bg-default-foreground font-medium text-background"
              color="secondary"
              as={Link}
              href={'/products/new'}
              endContent={<Icon icon="solar:alt-arrow-right-linear" />}
              radius="full"
              variant="flat"
            >
              Get Started
            </Button>
          </NavbarItem>
        </NavbarContent>

        <NavbarMenuToggle className="text-default-400 md:hidden" />

        <NavbarMenu
          className="top-[calc(var(--navbar-height)_-_1px)] max-h-fit bg-background py-6 shadow-medium backdrop-blur-md backdrop-saturate-150"
          motionProps={{
            initial: { opacity: 0, y: -20 },
            animate: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: -20 },
            transition: {
              ease: 'easeInOut',
              duration: 0.2
            }
          }}
        >
          <NavbarMenuItem>
            <Button fullWidth as={Link} href="/sign-in" variant="faded">
              Sign In
            </Button>
          </NavbarMenuItem>
          <NavbarMenuItem className="mb-4">
            <Button
              fullWidth
              as={Link}
              className="bg-foreground text-background"
              href={'/products/new'}
            >
              Get Started
            </Button>
          </NavbarMenuItem>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link className="mb-2 w-full text-default-500" href={item.href}>
                {item.title}
              </Link>
              {index < menuItems.length - 1 && (
                <Divider className="opacity-50" />
              )}
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
    )
  }
)

BasicNavbar.displayName = 'BasicNavbar'

export default BasicNavbar
