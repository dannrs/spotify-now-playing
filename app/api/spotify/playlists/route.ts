import { getServerSession } from 'next-auth'
import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'
import { authOptions } from '@/lib/auth'
import { getPlaylists } from '@/lib/spotify'
import { IPlaylistsAPIResponse } from '@/types'

export async function GET(request: NextRequest) {
  const path = request.nextUrl.searchParams.get('path') || '/'
  revalidatePath(path)
  const session = await getServerSession(authOptions)
  const response = await getPlaylists(session?.user.access_token as string)

  const song = await response.json()

  const playlists = song.items.map((playlist: IPlaylistsAPIResponse) => ({
    id: playlist.id,
    name: playlist.name,
    url: playlist.external_urls.spotify,
    playlistImageUrl: playlist.images ? playlist.images[0].url : null,
    playlistPage: '/playlists/' + playlist.id
  }))

  return NextResponse.json({
    revalidated: true,
    playlists
  })
}
