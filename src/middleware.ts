import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  const isPublicPath = path == '/login' || path == '/signup'

  const token = request.cookies.get('token')?.value || ''
  if(token && isPublicPath){
    return NextResponse.redirect(new URL('/',request.nextUrl))
  }

  if(!token && !isPublicPath){
    return NextResponse.redirect(new URL('/login',request.nextUrl))
  }
}

 //This is also a way of writing the config

// export const config = {
//   matcher: '/about/:path*',
// }
export const config = {
  matcher: [
    '/',
    '/profile/:path*',
    '/login',
    '/signup',
  ],
}