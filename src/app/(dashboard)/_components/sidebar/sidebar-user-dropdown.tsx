import { useClerk, useUser } from '@clerk/nextjs'
import { useLogSnag } from '@logsnag/next'
import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  User
} from '@nextui-org/react'
import { Crisp } from 'crisp-sdk-web'
import { ChevronsUpDown, Plus } from 'lucide-react'
import Link from 'next/link'

import { cn } from '@/lib/utils'

export const SidebarUserDropdown = ({
  isCollapsed
}: {
  isCollapsed: boolean
}) => {
  const { isLoaded, isSignedIn, user } = useUser()
  const { signOut, openUserProfile } = useClerk()
  const { track } = useLogSnag()

  if (!isLoaded || !isSignedIn) {
    return null
  }

  return (
    <Dropdown placement="top">
      <DropdownTrigger>
        <Button
          className={cn('h-20 items-center justify-between', {
            'justify-center': isCollapsed
          })}
          isIconOnly={isCollapsed}
          disableRipple
          variant="light"
        >
          <div className="flex items-center gap-3 text-left">
            <Avatar isBordered size="sm" src={user.imageUrl} />
            <div
              className={cn('flex max-w-full flex-col', {
                hidden: isCollapsed
              })}
            >
              <p className="text-small font-medium text-foreground">
                {user.fullName}
              </p>
            </div>
          </div>
          <ChevronsUpDown
            size={16}
            className={cn('text-default-400', {
              hidden: isCollapsed
            })}
          />
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Custom item styles"
        variant="flat"
        disabledKeys={['profile']}
      >
        <DropdownSection showDivider aria-label="Profile & Actions">
          <DropdownItem
            key="profile"
            isReadOnly
            className="h-14 gap-2 opacity-100"
            textValue="Signed in as"
          >
            <User
              avatarProps={{
                size: 'sm',
                imgProps: {
                  className: 'transition-none'
                },
                src: user.imageUrl
              }}
              classNames={{
                name: 'text-default-600',
                description: 'text-default-500'
              }}
              name={user.fullName}
            />
          </DropdownItem>
          <DropdownItem key="dashboard" onClick={() => openUserProfile()}>
            Profile
          </DropdownItem>
          <DropdownItem
            key="Billing"
            onClick={() => {
              track({
                channel: 'billing',
                event: `User Dropdown Billing Button Clicked`
              })
            }}
          >
            <Link href={'/billing'} className={'block'}>
              Billing
            </Link>
          </DropdownItem>
        </DropdownSection>

        <DropdownSection showDivider aria-label="Preferences">
          <DropdownItem key="new_product" endContent={<Plus size={16} />}>
            <Link href={'/products/new'} className={'block'}>
              New Product
            </Link>
          </DropdownItem>
        </DropdownSection>

        <DropdownSection aria-label="Help & Feedback">
          <DropdownItem
            onClick={() => {
              track({
                channel: 'helps',
                event: `User Dropdown Help & Feedback Button Clicked`
              })
              Crisp.chat.open()
            }}
            key="help_and_feedback"
          >
            Help & Feedback
          </DropdownItem>
          <DropdownItem
            onClick={() => signOut({ redirectUrl: '/sign-in' })}
            key="logout"
          >
            Log Out
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  )
}
