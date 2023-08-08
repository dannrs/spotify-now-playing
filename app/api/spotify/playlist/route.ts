import { getServerSession } from 'next-auth'
import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'
import { authOptions } from '@/lib/auth'
import { getPlaylistItem, getPlaylists } from '@/lib/spotify'
import { IPlaylistTracksAPIResponse } from '@/types'

export async function GET(request: NextRequest) {
  const path = request.nextUrl.searchParams.get('path') || '/'
  const id = new URL(request.url)
  console.log(id)
  const id2 = '37i9dQZF1F0sijgNaJdgit'
  revalidatePath(path)
  const session = await getServerSession(authOptions)
  const accessToken = session?.user.access_token as string
  const response = await getPlaylistItem(accessToken, id2)

  const song = await response.json()

  const playlistId = song.id
  const playlistName = song.name
  const playlistUrl = song.external_urls.spotify
  const playlistImageUrl = song.images ? song.images[0].url : null
  const playlistTracks = song.tracks.items.map(
    (item: IPlaylistTracksAPIResponse) => ({
      id: item.track.id,
      title: item.track.name,
      artist: item.track.artists.map(artist => artist.name).join(', '),
      url: item.track.external_urls.spotify,
      trackImageUrl: item.track.album.images[0].url
    })
  )

  return NextResponse.json({
    revalidated: true,
    playlistId,
    playlistName,
    playlistUrl,
    playlistImageUrl,
    playlistTracks
  })
}
