
import { User } from './app/types/interfaces';
import { NextResponse } from 'next/server'
import { withAuth } from "next-auth/middleware"

 


export default withAuth(

  

// This function can be marked `async` if using `await` inside
 function middleware(request) {

if (request.nextUrl.pathname.startsWith("/") && request.nextauth.token.roles[0].roleName!=="ADMIN") {
  // console.log("first")
  // console.log(request.nextauth.token)
  return NextResponse.redirect(new URL('/auth/login', request.url))
}



  },

  {
    
callbacks:{
authorized:({token})=>!!token,

}

  }


)

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/'],
}