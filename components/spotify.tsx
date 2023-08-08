import Image from 'next/image'
import Link from 'next/link'
import { SiSpotify } from 'react-icons/si'
import { Song } from '@/types'
import { cn } from '@/lib/utils'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'

export function Spotify({ song }: { song: Song }) {
  if (!song) {
    return null
  }

  const truncateSong = 'min-w-[11rem] max-w-[16rem] truncate text-sm'

  return (
    <div className='relative flex min-w-[20rem] max-w-[25rem] flex-col items-center rounded-sm bg-accent p-1 text-foreground'>
      <div className='flex h-full w-full items-center'>
        <Image
          className='relative'
          src={song.albumImageUrl}
          alt={song.title}
          width={64}
          height={64}
        />
        <div className='mx-4 flex flex-col items-start justify-center'>
          <p className={cn('font-semibold', truncateSong)}>{song.title}</p>
          <p className={cn(truncateSong)}>{song.artist}</p>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Link href={song.songUrl} rel='noreferrer' target='_blank'>
                <SiSpotify
                  className={cn(
                    'relative ml-1 mr-4',
                    song.isPlaying ? 'text-[#1DB954]' : 'text-foreground'
                  )}
                  size={20}
                />
                <span className='sr-only'>Open song on Spotify</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>Open song on Spotify</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  )
}
