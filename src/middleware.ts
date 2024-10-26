import {jwtDecode} from "jwt-decode";
import {cookies} from "next/headers";
import {NextResponse} from "next/server";
import type {NextRequest} from "next/server";

type Role = keyof typeof roleBasedPrivateRoutes;

const AuthRoutes = ["/Login", "/Register"];
const commonPrivateRoutes = [
  "/MyProfile",
  "/VolunteerApplication",
  "/MyRequests",
];
const roleBasedPrivateRoutes = {
  Admin: [/^\/Dashboard\/Admin/],
};

export function middleware(request: NextRequest) {
  const {pathname} = request.nextUrl;
  // console.log("path:", pathname);
  const accessToken = cookies().get("accessToken")?.value;

  if (!accessToken) {
    if (AuthRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/Login", request.url));
    }
  }

  if (
    accessToken &&
    (commonPrivateRoutes.includes(pathname) ||
      commonPrivateRoutes.some(route => pathname.startsWith(route)))
  ) {
    return NextResponse.next();
  }

  let decodedData = null;

  if (accessToken) {
    decodedData = jwtDecode(accessToken) as any;
  }

  const role = decodedData?.role;

  // if (role === 'ADMIN' && pathname.startsWith('/dashboard/admin')) {
  //    return NextResponse.next();
  // }

  if (role && roleBasedPrivateRoutes[role as Role]) {
    const routes = roleBasedPrivateRoutes[role as Role];
    if (routes.some(route => pathname.match(route))) {
      return NextResponse.next();
    }
  }

  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: [
    "/Login",
    "/Register",
    "/MyProfile",
    "/MyRequests",
    "/Dashboard/:page*",
    "/VolunteerApplication/:page*",
  ],
};
