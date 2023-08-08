type SpotifyAccessToken = {
  access_token: string
}

const client_id = process.env.SPOTIFY_CLIENT_ID
const client_secret = process.env.SPOTIFY_CLIENT_SECRET
const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64')
const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token'
const RECENTLY_PLAYED_ENDPOINT =
  'https://api.spotify.com/v1/me/player/recently-played'
const CURRENTLY_PLAYING_ENDPOINT =
  'https://api.spotify.com/v1/me/player/currently-playing'
const TOP_TRACKS_ENDPOINT =
  'https://api.spotify.com/v1/me/top/tracks?limit=10&time_range=short_term'
const TOP_ARTISTS_ENDPOINT =
  'https://api.spotify.com/v1/me/top/artists?limit=10&time_range=short_term'
const PLAYLISTS_ENDPOINT = 'https://api.spotify.com/v1/me/playlists?limit=50'

const getAccessToken = async (
  refresh_token: string
): Promise<SpotifyAccessToken> => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token
    })
  })

  return response.json()
}

export const getRecentlyPlayedSong = async (refresh_token: string) => {
  const { access_token }: { access_token: string } = await getAccessToken(
    refresh_token
  )

  return fetch(RECENTLY_PLAYED_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  })
}

export const getCurrentlyPlayingSong = async (refresh_token: string) => {
  const { access_token }: { access_token: string } = await getAccessToken(
    refresh_token
  )

  return fetch(CURRENTLY_PLAYING_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  })
}

export const getTopTracks = async (refresh_token: string) => {
  const { access_token }: { access_token: string } = await getAccessToken(
    refresh_token
  )

  return fetch(TOP_TRACKS_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  })
}

export const getTopArtists = async (refresh_token: string) => {
  const { access_token }: { access_token: string } = await getAccessToken(
    refresh_token
  )

  return fetch(TOP_ARTISTS_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  })
}

export const getPlaylists = async (refresh_token: string) => {
  const { access_token }: { access_token: string } = await getAccessToken(
    refresh_token
  )

  return fetch(PLAYLISTS_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  })
}

export const getPlaylistItem = async (refresh_token: string, id: string) => {
  const PLAYLISTS_ITEM_ENDPOINT = `https://api.spotify.com/v1/playlists/${id}`
  const { access_token }: { access_token: string } = await getAccessToken(
    refresh_token
  )

  return fetch(PLAYLISTS_ITEM_ENDPOINT, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${access_token}`
    }
  })
}
