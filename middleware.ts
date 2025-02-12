import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/forum(.*)",
  "/protected(.*)",
  "/secret",
]);

const isAuthPage = createRouteMatcher(["/sign-in(.*)", "/sign-up(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  const user = await auth();
  const isLoggedIn = user.userId; // Periksa apakah user login

  if (isProtectedRoute(req)) {
    await auth.protect(); // Lindungi halaman tertentu
  }

  // Jika user logout dan coba akses halaman yang butuh login, redirect ke root
  if (!isLoggedIn && isProtectedRoute(req)) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // // Jika user sudah login dan coba masuk ke /sign-in atau /sign-up, redirect ke dashboard
  // if (isLoggedIn && isAuthPage(req)) {
  //   return NextResponse.redirect(new URL("/dashboard", req.url));
  // }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js|json|jpg|png|gif|svg|ico)).*)",
    "/(api|trpc)(.*)",
  ],
};
