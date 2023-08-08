'use client'

import useSWR from 'swr'
import { fetcher } from '@/lib/utils'
import { useSession } from 'next-auth/react'
import { SpotifyArtist } from '@/types'
import { Artist } from '@/components/spotify-artist'
import { Loader2 } from 'lucide-react'

export default function TopArtist() {
  const { data: session } = useSession()
  const { data: topArtists } = useSWR('/api/spotify/top-artists', fetcher, {
    refreshInterval: 86400000
  })

  if (!(session && session.user)) {
    return null
  }

  return (
    <div className='container flex flex-col justify-start py-16 md:max-w-[60rem]'>
      <h1 className='pb-2 text-2xl font-bold md:text-3xl'>Top Artists</h1>
      <p className='mb-4 text-foreground/80'>
        Your favorite artists of the last 4 weeks
      </p>
      {topArtists ? (
        topArtists?.artists.map((artist: SpotifyArtist, index: number) => (
          <Artist
            key={index}
            url={artist.url}
            name={artist.name}
            artistImageUrl={artist.artistImageUrl}
            genres={artist.genres}
          />
        ))
      ) : (
        <div className='flex h-screen items-center justify-center'>
          <Loader2 className='z-40 h-10 w-10 animate-spin' />
        </div>
      )}
    </div>
  )
}
