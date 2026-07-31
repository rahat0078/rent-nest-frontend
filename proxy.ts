import { jwtDecode } from "jwt-decode";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { toast } from "sonner";

export const ROLE_DASHBOARDS: Record<string, string> = {
  ADMIN: "/dashboard/admin",
  LANDLORD: "/dashboard/landlord",
  TENANT: "/dashboard/tenant",
};

interface CustomJwtPayload {
  id: string;
  email: string;
  name: string;
  role: "ADMIN" | "LANDLORD" | "TENANT";
  iat?: number,
  exp?: number
}


export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const accessToken = request.cookies.get("accessToken")?.value;
  let role: string | undefined;

  if (accessToken) {
    try {
      const decoded = jwtDecode<CustomJwtPayload>(accessToken);
      role = decoded.role;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  const isAuthenticated = !!accessToken;

  // Define route groups
  const isAuthRoute =
    pathname.startsWith("/register") || pathname.startsWith("/login");

  const isProtectedRoute =
    pathname.startsWith("/dashboard") || pathname.startsWith("/profile");

  if (!isAuthenticated && isProtectedRoute) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirectTo", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthenticated && isAuthRoute) {
    const defaultDashboard =
      (role && ROLE_DASHBOARDS[role]) || "/dashboard/tenant";
    return NextResponse.redirect(new URL(defaultDashboard, request.url));
  }

  if (pathname.startsWith("/dashboard/tenant/payment")) {
    if (role !== "TENANT") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  if (isAuthenticated && pathname.startsWith("/dashboard")) {
    if (pathname.startsWith("/dashboard/admin") && role !== "ADMIN") {
      const userDashboard = ROLE_DASHBOARDS[role || ""] || "/";
      return NextResponse.redirect(new URL(userDashboard, request.url));
    }

    if (pathname.startsWith("/dashboard/landlord") && role !== "LANDLORD") {
      const userDashboard = ROLE_DASHBOARDS[role || ""] || "/";
      return NextResponse.redirect(new URL(userDashboard, request.url));
    }

    if (pathname.startsWith("/dashboard/tenant") && role !== "TENANT") {
      const userDashboard = ROLE_DASHBOARDS[role || ""] || "/";
      return NextResponse.redirect(new URL(userDashboard, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/register", "/login"],
};

export default proxy;
