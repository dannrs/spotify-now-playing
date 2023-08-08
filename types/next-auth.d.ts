import { DefaultSession } from 'next-auth'
import NextAuth from 'next-auth/next'
import { JWT } from 'next-auth/jwt'

declare module 'next-auth' {
  interface Session {
    user: {
      access_token: string | undefined
      picture: string
    } & DefaultSession['user']
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    access_token: string | undefined
  }
}
