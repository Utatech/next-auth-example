import { withAuth } from "next-auth/middleware"
import { NextResponse, NextRequest } from 'next/server'

// More on how NextAuth.js middleware works: https://next-auth.js.org/configuration/nextjs#middleware
// referensi https://simplernerd.com/next-auth-redirect-if-unauthenticated-using-middleware/
export default withAuth(
  function middleware(req) {
    console.log("token from middleware :", req.nextauth.token);
    if(req.nextauth.token.userRole !== "admin") {
      return NextResponse.redirect(process.env.NEXTAUTH_URL)
    }
  }, 
  {
    callbacks: {
      authorized: ({ token }) => token ? true : false,
    },
  }
);
