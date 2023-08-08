'use client'

import * as React from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function ModeToggle() {
  const { theme, setTheme } = useTheme()
  const [isDarkMode, setIsDarkMode] = React.useState<boolean>(true)

  React.useEffect(() => {
    setIsDarkMode(theme === 'dark')
  }, [theme])

  const handleModeToggle = () => {
    const newTheme = isDarkMode ? 'light' : 'dark'
    setIsDarkMode(!isDarkMode)
    setTheme(newTheme)
  }

  return (
    <div>
      <Button variant='ghost' size='icon' onClick={handleModeToggle}>
        {isDarkMode ? (
          <Moon className='h-[1.2rem] w-[1.2rem]' />
        ) : (
          <Sun className={cn('h-[1.2rem] w-[1.2rem]')} />
        )}
        <span className='sr-only'>Toggle theme</span>
      </Button>
    </div>
  )
}
