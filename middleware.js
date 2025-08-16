// middleware.js
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

// ------------------- CONFIG -------------------
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|403|404|api/ip-check|api/auth|assets|api/access-setting).*)",
  ],
};

// In-memory caches for performance
let allowedIPsCache = new Set();
let allowPublicAccessCache = false;
let lastCacheFetch = 0;

const CACHE_TTL = 60_000; // 1 minute


async function fetchAccessSettingsFromDB() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/access-settings`, {
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch access settings: ${res.status}`);
  }
  
  const accessSettings = await res.json(); // ✅ Parse JSON
  
  return {
    allowPublicAccess: accessSettings.allowPublicAccess,
    ips: accessSettings.ips,
  };
}

async function loadAccessSettings() {
  const now = Date.now();
  if (now - lastCacheFetch > CACHE_TTL) {
    try {
      const { allowPublicAccess, ips } = await fetchAccessSettingsFromDB();
      allowPublicAccessCache = !!allowPublicAccess;
      allowedIPsCache = new Set(ips.map((ip) => ip.trim()));
      lastCacheFetch = now;
    } catch (err) {
      console.error("Failed to load access settings:", err);
    }
  }
}

// ------------------- MIDDLEWARE -------------------
export async function middleware(request) {
  const pathname = request.nextUrl.pathname;

  // 1. Load cached settings (refresh if TTL expired)
  await loadAccessSettings();

  // 2. IP restriction (unless public access is allowed or path is admin)
  const skipIpCheck =
    allowPublicAccessCache ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/api/admin");

  if (!skipIpCheck) {
    const ip = getClientIp(request);
    if (!allowedIPsCache.has(ip)) {
      console.warn(`🚫 Denied IP: ${ip} for path ${pathname}`);
      return NextResponse.redirect(new URL("/403", request.url));
    }
  }

  // 3. Role-based authorization
  const protectedPaths = [
    { prefix: "/admin", roles: ["admin", "superadmin"] },
    { prefix: "/user", roles: ["user", "admin", "superadmin"] },
    { prefix: "/api/admin", roles: ["admin", "superadmin"] },
    { prefix: "/api/user", roles: ["user", "admin", "superadmin"] },
  ];

  let user = null;

  for (const { prefix, roles } of protectedPaths) {
    if (pathname.startsWith(prefix)) {
      const result = await authorize(request, roles);
      if (result instanceof Response) return result;
      user = result;
      break;
    }
  }

  // 4. Pass request with optional user info
  const response = NextResponse.next();
  if (user) {
    response.headers.set("x-user-id", String(user.id));
    response.headers.set("x-user-role", String(user.role));
  }
  return response;
}

// ------------------- HELPERS -------------------
function getClientIp(request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  return forwardedFor?.split(",")[0].trim() || request.ip || "0.0.0.0";
}

async function authenticate(request) {
  const pathname = request.nextUrl.pathname;
  let token;
  try {
    token = await getToken({ req: request, secret });
  } catch (err) {
    console.error("JWT parse failed:", err);
    return new Response(JSON.stringify({ message: "Token error" }), {
      status: 401,
    });
  }

  if (!token) {
    if (!pathname.startsWith("/api")) {
      return NextResponse.redirect(new URL("/403", request.url));
    }
    return new Response(JSON.stringify({ message: "Unauthenticated" }), {
      status: 401,
    });
  }

  if (!token?.id || !token?.role) {
    return new Response(JSON.stringify({ message: "Invalid token" }), {
      status: 401,
    });
  }

  return { id: token.id, role: token.role };
}

async function authorize(request, allowedRoles = []) {
  const pathname = request.nextUrl.pathname;
  console.log(
    `🔐 Authorizing ${pathname} with roles: ${allowedRoles.join(",")}`
  );

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

// export const runtime = "nodejs"; // nodejs runtime
export const runtime = "experimental-edge"; //edge runtime
