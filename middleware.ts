import { getToken } from 'next-auth/jwt'
import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  async function middleware(req) {
    const token = await getToken({ req })
    const isAuth = !!token
    const isAuthPage = req.nextUrl.pathname.startsWith('/signin')

    if (isAuthPage) {
      if (isAuth) {
        return NextResponse.redirect(new URL('/', req.url))
      }
      return null
    }

    if (!isAuth) {
      return NextResponse.redirect(new URL('/signin', req.url))
    }
  },
  {
    callbacks: {
      async authorized() {
        return true
      }
    }
  }
)
