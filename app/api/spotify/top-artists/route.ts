import { getServerSession } from 'next-auth'
import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'
import { authOptions } from '@/lib/auth'
import { getTopArtists } from '@/lib/spotify'
import { IArtistsAPIResponse } from '@/types'

export async function GET(request: NextRequest) {
  const path = request.nextUrl.searchParams.get('path') || '/'
  revalidatePath(path)
  const session = await getServerSession(authOptions)
  const response = await getTopArtists(session?.user.access_token as string)

  const song = await response.json()

  const artists = song.items.map((artist: IArtistsAPIResponse) => ({
    name: artist.name,
    url: artist.external_urls.spotify,
    artistImageUrl: artist.images ? artist.images[0].url : null,
    genres: artist.genres?.map(genre => genre).join(', ')
  }))

  return NextResponse.json({
    revalidated: true,
    artists
  })
}
