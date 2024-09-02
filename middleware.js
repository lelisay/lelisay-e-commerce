import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    console.log(req.nextUrl.pathname);

    // Check if the token is present
    const token = req.nextauth.token;
    if (!token) {
      console.log("Token is undefined");
      return NextResponse.rewrite(new URL("/DeniedPage", req.url));
    }

    // Now you can safely access the role
    console.log(token.role);

    if (
      req.nextUrl.pathname.startsWith("/Admin") &&
      token.role !== "admin"
    ) {
      return NextResponse.rewrite(new URL("/DeniedPage", req.url));
    }

    // Proceed if everything is fine
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = { matcher: ["/Admin/:path*", "/CreateUser"] };
