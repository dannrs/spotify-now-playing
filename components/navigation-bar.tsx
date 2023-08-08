'use client'

import { signOut, useSession } from 'next-auth/react'
import { usePathname, useSelectedLayoutSegment } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import Link from 'next/link'
import { SheetItem } from '@/types'
import { cn } from '@/lib/utils'
import { ModeToggle } from './mode-toggle'

interface NavigationProps {
  items?: SheetItem[]
}

export function NavigationBar({ items }: NavigationProps) {
  const { data: session } = useSession()
  const segment = useSelectedLayoutSegment()
  const pathname = usePathname()

  if (!(session && session.user)) {
    return null
  }

  return (
    <header className='flex items-center justify-center'>
      <div className='container absolute top-2 md:max-w-[60rem]'>
        <div
          className={cn(
            'flex h-10 items-center justify-between gap-4 pb-2',
            items?.map(item =>
              item.href === '/' && pathname === '/'
                ? 'border-none'
                : 'border-b border-b-accent'
            )
          )}
        >
          <Link className='text-sm font-semibold' href='/'>
            spotify-next
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                {session?.user.picture && (
                  <AvatarImage src={session?.user.picture} />
                )}
                <AvatarFallback>
                  {session?.user.name?.substring(0, 1)}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='mr-8 w-60 md:mr-0'>
              <DropdownMenuLabel>
                <div className='flex items-center justify-start gap-2 px-2'>
                  <p className='max-w-[9.5rem] truncate'>
                    {session?.user.name}
                  </p>
                  <ModeToggle />
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <div className='grid w-full gap-1'>
                    {items?.map((item, index) => (
                      <Link
                        key={index}
                        href={item.href}
                        className={cn(
                          'rounded-sm px-2 hover:bg-accent',
                          item.href === '/' && pathname === '/'
                            ? 'rounded-sm bg-accent px-2 py-2 font-bold'
                            : 'py-2 text-foreground',
                          item.href.startsWith(`/${segment}`)
                            ? 'rounded-sm bg-accent px-2 py-2 font-semibold'
                            : 'py-2 text-foreground'
                        )}
                      >
                        {item.title}
                      </Link>
                    ))}
                  </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Button
                    variant='text-only'
                    size='text-only'
                    className='rounded-sm px-2 py-2 text-sm hover:bg-accent'
                    onClick={() => signOut()}
                  >
                    Sign out
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
