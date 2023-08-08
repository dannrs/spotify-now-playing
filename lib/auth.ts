import { NextAuthOptions } from 'next-auth'
import SpotifyProvider from 'next-auth/providers/spotify'

const client_id = process.env.SPOTIFY_CLIENT_ID
const client_secret = process.env.SPOTIFY_CLIENT_SECRET

export const authOptions: NextAuthOptions = {
  providers: [
    SpotifyProvider({
      authorization: {
        params: {
          scope:
            'user-read-email user-read-currently-playing user-read-recently-played playlist-read-private user-top-read'
        }
      },
      clientId: client_id as string,
      clientSecret: client_secret as string
    })
  ],
  pages: {
    signIn: '/signin'
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.access_token = account.refresh_token
      }
      return token
    },
    async session({ session, token }) {
      session.user = token
      return session
    }
  }
}
