'use client'

import { useLogSnag } from '@logsnag/next'
import {
  Button,
  ScrollShadow,
  Spacer,
  Tooltip,
  useDisclosure
} from '@nextui-org/react'
import { Crisp } from 'crisp-sdk-web'
import { CircleHelp, PanelLeftClose, PanelLeftOpen, Text } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { ReactNode, useCallback, useState } from 'react'
import { useMediaQuery } from 'usehooks-ts'

import { CreditsLeftCard } from '@/app/(dashboard)/_components/credits-left-card'
import Sidebar from '@/app/(dashboard)/_components/sidebar'
import { sectionItemsWithCatalogs } from '@/app/(dashboard)/_components/sidebar/items'
import SidebarDrawer from '@/app/(dashboard)/_components/sidebar/sidebar-drawer'
import { SidebarUserDropdown } from '@/app/(dashboard)/_components/sidebar/sidebar-user-dropdown'
import { type Catalog } from '@/drizzle/schema'
import { cn } from '@/lib/utils'

type Props = {
  children: ReactNode
  catalogs: Catalog[]
  currentUserCredits: number
}

export default function DashboardLayout({
  children,
  catalogs,
  currentUserCredits
}: Props) {
  const { isOpen, onOpenChange } = useDisclosure()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const isMobile = useMediaQuery('(max-width: 768px)')
  const pathname = usePathname()
  const currentPath = pathname.split('/')?.[1]
  const { track } = useLogSnag()

  const onToggle = useCallback(() => {
    setIsCollapsed(prev => !prev)
  }, [])

  return (
    <div className="flex h-dvh w-full">
      {/* Sidebar */}
      <SidebarDrawer
        className={cn('min-w-[288px] border-r bg-default-100', {
          'min-w-[76px]': isCollapsed
        })}
        hideCloseButton={true}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <div
          className={cn(
            'will-change relative flex h-full w-72 flex-col bg-default-100 p-6 transition-width',
            {
              'w-[83px] items-center px-[6px] py-6': isCollapsed
            }
          )}
        >
          <div
            className={cn('flex items-center gap-2 pl-2', {
              'justify-center gap-0 pl-0': isCollapsed
            })}
          >
            <Text
              onClick={onToggle}
              className={cn('shrink-0', { 'cursor-pointer': isCollapsed })}
            />
            <span
              className={cn('w-full font-semibold uppercase opacity-100', {
                'w-0 opacity-0': isCollapsed
              })}
            >
              Describa
            </span>
            <div
              className={cn('flex-end flex', {
                hidden: isCollapsed
              })}
            >
              <PanelLeftClose
                size={20}
                className="cursor-pointer text-default-500"
                onClick={isMobile ? onOpenChange : onToggle}
              />
            </div>
          </div>

          <Spacer y={6} />

          <ScrollShadow className="-mr-6 h-full max-h-full py-6 pr-6">
            <Sidebar
              defaultSelectedKey="dashboard"
              selectedKeys={[currentPath]}
              iconClassName="group-data-[selected=true]:text-default-50"
              isCompact={isCollapsed}
              itemClasses={{
                base: 'px-3 rounded-large data-[selected=true]:!bg-foreground',
                title: 'group-data-[selected=true]:text-default-50'
              }}
              items={sectionItemsWithCatalogs(catalogs)}
            />
          </ScrollShadow>
          <Spacer y={4} />
          {!isCollapsed && <CreditsLeftCard credits={currentUserCredits} />}
          <Spacer y={8} />
          <div
            className={cn('mt-auto flex flex-col', {
              'items-center': isCollapsed
            })}
          >
            {isCollapsed && (
              <Button
                isIconOnly
                className="flex size-10 text-default-600"
                size="sm"
                variant="light"
              >
                <PanelLeftOpen
                  size={20}
                  className="cursor-pointer text-default-500"
                  onClick={onToggle}
                />
              </Button>
            )}
            <Tooltip
              content="Help & Support"
              isDisabled={!isCollapsed}
              placement="right"
            >
              <Button
                className={cn(
                  'justify-start text-default-500 data-[hover=true]:text-foreground',
                  {
                    'justify-center': isCollapsed
                  }
                )}
                isIconOnly={isCollapsed}
                onPress={() => {
                  track({
                    channel: 'helps',
                    event: `Sidebar Help & Feedback Button Clicked`
                  })
                  Crisp.chat.open()
                }}
                startContent={
                  isCollapsed ? null : (
                    <CircleHelp size={20} className="text-default-500" />
                  )
                }
                variant="light"
              >
                {isCollapsed ? (
                  <CircleHelp className="text-default-500" size={20} />
                ) : (
                  'Help & Feedback'
                )}
              </Button>
            </Tooltip>
          </div>
          <Spacer y={4} />
          <SidebarUserDropdown isCollapsed={isCollapsed} />
        </div>
      </SidebarDrawer>

      {/* Content */}
      <div className="w-full flex-1 overflow-y-auto bg-default-100 p-8">
        {children}
      </div>
    </div>
  )
}
