import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "./app/lib/jwt";

const protectedRoutes = [
  "/cart",
  "/payment",
  "/address",
  "/like",
  "/profile",
  "/reviewOrder",
];

const loginRoutes = ["/login", "/signup"];

export default async function middleware(req: any) {
  const { pathname } = req.nextUrl;

  const cookieStore = cookies();
  const accessTokenUser: any = cookieStore.get("LOGIN-INFO-USER");
  const accessTokenAdmin: any = cookieStore.get("LOGIN-INFO-ADMIN");

  if (accessTokenUser) {
    const checkToken: any = await verifyToken(accessTokenUser.value);
    const error: any = checkToken.code;
    if (error == "ERR_JWS_INVALID" && protectedRoutes.includes(pathname)) {
      const absoluteURL = new URL("/login", req.nextUrl.origin);
      return NextResponse.redirect(absoluteURL.toString());
    }
    if (error != "ERR_JWS_INVALID" && loginRoutes.includes(pathname)) {
      const absoluteURL = new URL("/", req.nextUrl.origin);
      return NextResponse.redirect(absoluteURL.toString());
    }
  } else {
    if (!accessTokenUser && protectedRoutes.includes(pathname)) {
      const absoluteURL = new URL("/login", req.nextUrl.origin);
      return NextResponse.redirect(absoluteURL.toString());
    }
  }

  if (accessTokenAdmin) {
    const checkToken: any = await verifyToken(accessTokenAdmin.value);
    const error: any = checkToken.code;
    if (
      error == "ERR_JWS_INVALID" &&
      pathname.startsWith("/admin") &&
      pathname != "/admin/login"
    ) {
      const absoluteURL = new URL("/admin/login", req.nextUrl.origin);
      return NextResponse.redirect(absoluteURL.toString());
    }
    if (error != "ERR_JWS_INVALID" && pathname == "/admin/login") {
      const absoluteURL = new URL("/admin", req.nextUrl.origin);
      return NextResponse.redirect(absoluteURL.toString());
    }
  } else {
    if (pathname.startsWith("/admin") && pathname != "/admin/login") {
      const absoluteURL = new URL("/admin/login", req.nextUrl.origin);
      return NextResponse.redirect(absoluteURL.toString());
    }
  }
}