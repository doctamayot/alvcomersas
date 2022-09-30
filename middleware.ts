import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextFetchEvent, NextRequest } from "next/server";

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
  // return early if url isn"t supposed to be protected
  if (!req.url.includes("/admin")) {
    return NextResponse.next();
  }

  const session = (await getToken({
    req,
    secret: process.env.SECRET,
  } as any)) as any;

  // You could also check for any property on the session object,
  // like role === "admin" or name === "John Doe", etc.
  if (!session) return NextResponse.rewrite(new URL("/", req.url));
  if (session.user.role != "Admin")
    return NextResponse.rewrite(new URL("/", req.url));

  // If user is authenticated, continue.
  return NextResponse.next();
}
