'use client'

import useSWR from 'swr'
import { fetcher } from '@/lib/utils'
import { SpotifyPlaylists } from '@/types'
import Image from 'next/image'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

export default function SpotifyPlaylists() {
  const { data: session } = useSession()
  const { data: playlists } = useSWR('/api/spotify/playlists', fetcher, {
    refreshInterval: 86400000
  })

  if (!(session && session.user)) {
    return null
  }

  return (
    <div className='container flex flex-col justify-start py-16 md:max-w-[60rem]'>
      <h1 className='pb-2 text-2xl font-bold md:text-3xl'>Playlists</h1>
      <p className='mb-4 text-foreground/80'>
        Playlists you created on Spotify
      </p>
      {playlists ? (
        <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4'>
          {playlists?.playlists.map((playlist: SpotifyPlaylists) => (
            <div
              key={playlist.id}
              className='relative flex flex-col space-y-4 rounded-sm bg-accent p-4'
            >
              <Image
                src={playlist.playlistImageUrl}
                alt={playlist.name}
                width={640}
                height={640}
              />
              <p>{playlist.name}</p>
              <Link href={playlist.playlistPage} className='absolute inset-0'>
                <span className='sr-only'>View Playlist</span>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className='flex h-screen items-center justify-center'>
          <Loader2 className='z-50 h-10 w-10 animate-spin' />
        </div>
      )}
    </div>
  )
}
