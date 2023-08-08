import { getServerSession } from 'next-auth'
import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'
import { getRecentlyPlayedSong } from '@/lib/spotify'
import { authOptions } from '@/lib/auth'

export async function GET(request: NextRequest) {
  const path = request.nextUrl.searchParams.get('path') || '/'
  revalidatePath(path)
  const session = await getServerSession(authOptions)
  const response = await getRecentlyPlayedSong(
    session?.user.access_token as string
  )

  const song = await response.json()

  const title = song.items[0].track.name
  const artist = song.items[0].track.artists[0].name
  const albumImageUrl = song.items[0].track.album.images[0].url
  const songUrl = song.items[0].track.external_urls.spotify

  return NextResponse.json({
    revalidated: true,
    title,
    artist,
    albumImageUrl,
    songUrl
  })
}
