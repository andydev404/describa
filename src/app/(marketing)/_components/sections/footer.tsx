import { Link as LinkUI, Spacer } from '@nextui-org/react'
import { Text } from 'lucide-react'
import Link from 'next/link'

export const Footer = () => {
  const navLinks = [
    {
      name: 'Home',
      href: '/'
    },
    {
      name: 'Features',
      href: '#features'
    },
    {
      name: 'Pricing',
      href: '#pricing'
    },
    {
      name: 'Faq',
      href: '#faq'
    },
    {
      name: 'Contact',
      href: '/contact'
    },
    {
      name: 'Privacy Policy',
      href: '/privacy-policy'
    },
    {
      name: 'Terms of Service',
      href: '/terms-of-service'
    },
    {
      name: 'Refund policy',
      href: '/refund-policy'
    }
  ]
  return (
    <footer className="flex w-full flex-col">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center px-6 py-12 lg:px-8">
        <div className="flex items-center justify-center gap-2 text-foreground">
          <Text size={28} />
          <span className="text-medium font-semibold">Describa</span>
        </div>
        <Spacer y={4} />
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
          {navLinks.map(item => (
            <LinkUI
              as={Link}
              key={item.name}
              className="text-default-500"
              href={item.href}
              size="sm"
            >
              {item.name}
            </LinkUI>
          ))}
        </div>
        <Spacer y={6} />
        <p className="mt-1 text-center text-small text-default-400">
          &copy; {new Date().getFullYear()} Describa. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
