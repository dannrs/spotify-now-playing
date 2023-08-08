'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Button } from './ui/button'
import { SiSpotify } from 'react-icons/si'
import { signIn } from 'next-auth/react'

export function SignInCard() {
  return (
    <Card className='w-[350px]'>
      <CardHeader>
        <CardTitle>Sign in</CardTitle>
        <CardDescription>
          Please sign in with your Spotify account to continue.
        </CardDescription>
      </CardHeader>
      <CardContent className='flex justify-center'>
        <Button onClick={() => signIn('spotify')}>
          <SiSpotify size={16} className='mr-2' />
          Sign in with Spotify
        </Button>
      </CardContent>
    </Card>
  )
}
