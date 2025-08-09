// app/api/ip-check/route.js
import { NextResponse } from "next/server";
import { isIPAllowed } from "@/lib/ipChecker";

export async function POST(request) {
  const body = await request.json();
  const ip = body.ip;
  const allowed = await isIPAllowed(ip);
  return NextResponse.json({ allowed });
}
