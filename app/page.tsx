'use client'

import useSWR from 'swr'
import { fetcher } from '@/lib/utils'
import { useSession } from 'next-auth/react'
import { Spotify } from '@/components/spotify'
import ColorFinder from '@/components/color-finder'
import { Loader2 } from 'lucide-react'

export default function Home() {
  const { data: session } = useSession()
  // console.log(session?.user)
  const { data: currentlyPlaying } = useSWR(
    '/api/spotify/currently-playing',
    fetcher,
    { refreshInterval: 60000 }
  )
  const { data: recentlyPlayed } = useSWR(
    '/api/spotify/recently-played',
    fetcher,
    { refreshInterval: 600000 }
  )

  if (!(session && session.user)) {
    return null
  }

  return (
    <>
      {currentlyPlaying ? (
        <ColorFinder imageUrl={currentlyPlaying?.albumImageUrl}>
          {(gradientColors: string[]) => (
            <div
              className='flex h-[100vh] items-center justify-center'
              style={{
                backgroundImage: `linear-gradient(to bottom, ${gradientColors[0]}, ${gradientColors[1]})`
              }}
            >
              <div className='flex items-center justify-center'>
                {currentlyPlaying?.isPlaying ? (
                  <Spotify song={currentlyPlaying} />
                ) : (
                  <Spotify song={recentlyPlayed} />
                )}
              </div>
            </div>
          )}
        </ColorFinder>
      ) : (
        <div className='flex h-screen items-center justify-center'>
          <Loader2 className='z-40 h-10 w-10 animate-spin' />
        </div>
      )}
    </>
  )
}
