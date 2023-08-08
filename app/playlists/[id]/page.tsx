import Link from 'next/link'
import Image from 'next/image'
import { IPlaylistTracksAPIResponse } from '@/types'
import { ChevronLeft, Loader2 } from 'lucide-react'
import { Track } from '@/components/spotify-track'
import { getPlaylistItem } from '@/lib/spotify'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { Button } from '@/components/ui/button'

interface PlaylistPageProps {
  params: {
    id: string
  }
}

export default async function SpotifyPlaylistPage({
  params
}: PlaylistPageProps) {
  const session = await getServerSession(authOptions)

  if (!(session && session.user)) {
    return null
  }

  const accessToken = session?.user.access_token as string
  const res = await getPlaylistItem(accessToken, params.id)
  const data = await res.json()

  const playlistName = data.name
  const playlistUrl = data.external_urls.spotify
  const playlistImageUrl = data.images ? data.images[0].url : null

  return (
    <div className='container flex flex-col justify-start py-16 md:max-w-[60rem]'>
      {data && (
        <div className='flex flex-col items-center justify-center gap-4 py-4'>
          <Image
            src={playlistImageUrl}
            alt={playlistName}
            width={320}
            height={320}
          />
          <Link
            href={playlistUrl}
            rel='noreferrer'
            target='_blank'
            className='pb-2 text-2xl font-bold hover:underline hover:underline-offset-4 md:text-3xl'
          >
            {playlistName}
          </Link>
        </div>
      )}
      <div>
        {data ? (
          data?.tracks.items.map(
            (item: IPlaylistTracksAPIResponse, index: number) => (
              <Track
                key={index}
                url={item.track.external_urls.spotify}
                title={item.track.name}
                trackImageUrl={item.track.album.images[0].url}
                artist={item.track.artists
                  .map(artist => artist.name)
                  .join(', ')}
              />
            )
          )
        ) : (
          <div className='flex h-screen w-screen items-center justify-center'>
            <Loader2 className='z-50 h-10 w-10 animate-spin' />
          </div>
        )}
      </div>
      <div className='flex items-center justify-center py-8'>
        <Link href='/playlists'>
          <Button variant='ghost' size='sm'>
            <ChevronLeft className='mr-2 h-4 w-4' />
            <span className='mr-1'>Back to Playlists</span>
          </Button>
        </Link>
      </div>
    </div>
  )
}
