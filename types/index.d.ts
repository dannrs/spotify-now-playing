import { LucideIcon } from 'lucide-react'

export type SheetItem = {
  title: string
  href: string
}

export type SheetRoutes = {
  sheetItem: SheetItem[]
}

export type Song = {
  album: string
  artist: string
  albumImageUrl: string
  isPlaying: boolean
  songUrl: string
  title: string
}

export type SpotifyTrack = {
  title: string
  artist: string
  url: string
  trackImageUrl: string
}

export type SpotifyArtist = {
  name: string
  url: string
  artistImageUrl: string
  genres: string[]
}

export type SpotifyPlaylists = {
  id: string
  name: string
  url: string
  playlistImageUrl: string
  playlistPage: string
}

export type SpotifyPlaylist = {
  playlistId: string
  playlistName: string
  playlistUrl: string
  playlistImageUrl: string
  playlistTracks: SpotifyTrack[]
}

export interface IExternalUrls {
  spotify: string
}

export interface ISpotifyAlbum {
  album_type: string
  artists: ISpotifyAlbum[]
  available_markets: string[]
  external_urls: IExternalUrls
  href: string
  id: string
  images: IImagesEntity[]
  name: string
  release_date: string
  release_date_precision: string
  total_tracks: number
  type: string
  uri: string
}

export interface IFollowers {
  href?: null
  total: number
}

export interface IImagesEntity {
  height: number
  url: string
  width: number
}

export interface ITracksAPIResponse {
  album: ISpotifyAlbum
  artists: ISpotifyAlbum[]
  available_markets: string[]
  disc_number: number
  duration_ms: number
  explicit: boolean
  external_urls: IExternalUrls
  href: string
  id: string
  is_local: boolean
  name: string
  popularity: number
  preview_url?: string
  track_number: number
  type: string
  uri: string
}

export interface IArtistsAPIResponse {
  external_urls: IExternalUrls
  followers: IFollowers
  genres?: string[] | null
  href: string
  id: string
  images?: IImagesEntity[] | null
  name: string
  popularity: number
  type: string
  uri: string
}

export interface IPlaylistTracksAPIResponse {
  track: {
    album: ISpotifyAlbum
    artists: ISpotifyAlbum[]
    available_markets: string[]
    disc_number: number
    duration_ms: number
    explicit: boolean
    external_urls: IExternalUrls
    href: string
    id: string
    is_local: boolean
    name: string
    popularity: number
    preview_url?: string
    track_number: number
    type: string
    uri: string
  }
}

export interface IPlaylistsAPIResponse {
  external_urls: IExternalUrls
  href: string
  id: string
  images?: IImagesEntity[] | null
  name: string
  type: string
  uri: string
}
