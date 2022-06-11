import { withAuth } from "next-auth/middleware"

// More on how NextAuth.js middleware works: https://next-auth.js.org/configuration/nextjs#middleware
// referensi https://simplernerd.com/next-auth-redirect-if-unauthenticated-using-middleware/
export default withAuth({
  callbacks: {
    authorized: ({ token }) => token?.userRole === "admin",
  },
})
