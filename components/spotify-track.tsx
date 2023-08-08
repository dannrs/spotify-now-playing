import Image from 'next/image'
import Link from 'next/link'
import { SpotifyTrack } from '@/types'
import { cn } from '@/lib/utils'

export function Track({ title, artist, url, trackImageUrl }: SpotifyTrack) {
  return (
    <Link
      href={url}
      target='_blank'
      rel='noreferrer'
      className='flex gap-2 border-x border-b px-2 py-2 first:border-t hover:bg-accent/30'
    >
      <div>
        <Image src={trackImageUrl} width={64} height={64} alt={title} />
      </div>
      <div className='flex flex-col items-start justify-center'>
        <div
          className={cn(
            'whitespace-nowrap font-semibold',
            title.length > 35
              ? 'text-xs'
              : title.length > 25
              ? 'text-sm'
              : 'text-base'
          )}
        >
          {title}
        </div>
        <div
          className={cn(
            artist.length > 35
              ? 'text-xs'
              : artist.length > 25
              ? 'text-sm'
              : 'text-base'
          )}
        >
          {artist}
        </div>
      </div>
    </Link>
  )
}
