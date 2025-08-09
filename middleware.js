// middleware.js
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { isIPAllowed } from "@/lib/ipChecker";

const secret = process.env.NEXTAUTH_SECRET;

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|403|404|api/ip-check|api/auth).*)"],
};

export async function middleware(request) {
  const pathname = request.nextUrl.pathname;

  // 1. IP RESTRICTION (skip for /admin and /api/admin)
  const skipIpCheck =
    pathname.startsWith("/admin") || pathname.startsWith("/api/admin");

  if (!skipIpCheck) {
    const ip = getClientIp(request);

    // const allowed = await isIPAllowed(ip);
    // const allowed = process.env.NEXT_PUBLIC_STATIC_IP == ip;
    const allowed = true;
    if (!allowed) {
      return NextResponse.redirect(new URL("/403", request.url));
    }
  }

  // 2. ROLE-BASED AUTHORIZATION
  const protectedPaths = [
    { prefix: "/admin", roles: ["admin", "superadmin"] },
    { prefix: "/user", roles: ["user", "admin", "superadmin"] },
    { prefix: "/api/admin", roles: ["admin", "superadmin"] },
    { prefix: "/api/user", roles: ["user", "admin", "superadmin"] },
  ];

  let user;

  for (const { prefix, roles } of protectedPaths) {
    if (pathname.startsWith(prefix)) {
      const result = await authorize(request, roles);
      if (result instanceof Response) return result;
      user = result;
      break;
    }
  }

  const response = NextResponse.next();

  // 3. Set user info in headers for downstream usage
  if (user) {
    response.headers.set("x-user-id", user.id);
    response.headers.set("x-user-role", user.role);
  }

  return response;
}

// 🔧 IP address extraction
function getClientIp(request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  return forwardedFor?.split(",")[0].trim() || "0.0.0.0";
}

// ✅ Authenticate user from JWT token via NextAuth
async function authenticate(request) {
  const pathname = request.nextUrl.pathname;
  let token ;
  try {
    token = await getToken({ req: request, secret });
  } catch (err) {
    console.error("JWT parse failed in Edge runtime:", err);
    return new Response(JSON.stringify({ message: "Token error" }), { status: 401 });
  }

  if (!token) {
    // Redirect non-API routes to /403
    if (!pathname.startsWith("/api")) {
      return NextResponse.redirect(new URL("/403", request.url));
    }

    return new Response(JSON.stringify({ message: "Unauthenticated" }), {
      status: 401,
    });
  }

  // Ensure token has role and id
  if (!token?.id || !token?.role) {
    return new Response(JSON.stringify({ message: "Invalid token" }), {
      status: 401,
    });
  }

  return {
    id: token.id,
    role: token.role,
  };
}

// ✅ Authorize user based on allowed roles
async function authorize(request, allowedRoles = []) {
  const pathname = request.nextUrl.pathname;
  console.log("🔐 Authorizing path:", pathname);

  const user = await authenticate(request);

  if (user instanceof Response) return user;

  if (!allowedRoles.includes(user.role)) {
    if (!pathname.startsWith("/api")) {
      return NextResponse.redirect(new URL("/403", request.url));
    }

    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 403,
    });
  }

  return user;
}

// export const runtime = 'experimental-edge';