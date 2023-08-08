'use client'

import useSWR from 'swr'
import { fetcher } from '@/lib/utils'
import { useSession } from 'next-auth/react'
import { SpotifyTrack } from '@/types'
import { Track } from '@/components/spotify-track'
import { Loader2 } from 'lucide-react'

export default function TopTracks() {
  const { data: session } = useSession()
  const { data: topTracks } = useSWR('/api/spotify/top-tracks', fetcher, {
    refreshInterval: 86400000
  })

  if (!(session && session.user)) {
    return null
  }

  return (
    <div className='container flex flex-col justify-start py-16 md:max-w-[60rem]'>
      <h1 className='pb-2 text-2xl font-bold md:text-3xl'>Top Tracks</h1>
      <p className='mb-4 text-foreground/80'>
        Your favorite songs from the last 4 weeks
      </p>
      <div>
        {topTracks ? (
          topTracks?.tracks.map((track: SpotifyTrack, index: number) => (
            <Track
              key={index}
              url={track.url}
              title={track.title}
              trackImageUrl={track.trackImageUrl}
              artist={track.artist}
            />
          ))
        ) : (
          <div className='flex h-screen items-center justify-center'>
            <Loader2 className='z-50 h-10 w-10 animate-spin' />
          </div>
        )}
      </div>
    </div>
  )
}
