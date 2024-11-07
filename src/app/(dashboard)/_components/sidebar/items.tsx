import { House, Package2, Tag } from 'lucide-react'

import { CatalogAvatar } from '@/app/(dashboard)/catalogs/_components/catalog-avatar'
import { type Catalog } from '@/drizzle/schema'

import { type SidebarItem } from './index'

export const sectionItems: SidebarItem[] = [
  {
    key: 'overview',
    title: 'Menu',
    items: [
      {
        key: 'dashboard',
        href: '/dashboard',
        icon: <House size={20} />,
        title: 'Dashboard'
      },
      {
        key: 'products',
        href: '/products',
        icon: <Package2 size={20} />,
        title: 'Products'
      },
      {
        key: 'catalogs',
        href: '/catalogs',
        icon: <Tag size={20} />,
        title: 'Catalogs'
      }
    ]
  }
]

export const sectionItemsWithCatalogs = (
  catalogs: Catalog[]
): SidebarItem[] => {
  return [
    ...sectionItems,
    {
      key: 'your-catalogs',
      title: 'Recent Catalogs',
      items: catalogs.slice(0, 6).map(({ title, id }) => ({
        key: id,
        href: `/catalogs/${id}`,
        title: title,
        startContent: <CatalogAvatar name={title} />
      }))
    }
  ]
}
