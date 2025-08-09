// lib/ipChecker.js
import prisma from "@/lib/prisma";

export async function isIPAllowed(ip) {
  const libraryId = Number(process.env.LIBRARY_ID);
  
  
  const settings = await prisma.setting.findUnique({
    where: { libraryId },
  });

  if (!settings) return false;
  if (settings.remoteAccess) return true;

  const allowed = await prisma.allowedIP.findFirst({
    where: { ipAddress: ip, libraryId },
  });

  return !!allowed;
}
