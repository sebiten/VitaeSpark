// utils/middleware-geo.ts
import { NextResponse, type NextRequest } from "next/server";

const ALLOWED_COUNTRIES = [
    "AR", // Argentina
    "BO", // Bolivia
    "CL", // Chile
    "CO", // Colombia
    "CR", // Costa Rica
    "CU", // Cuba
    "DO", // República Dominicana
    "EC", // Ecuador
    "SV", // El Salvador
    "GT", // Guatemala
    "HN", // Honduras
    "MX", // México
    "NI", // Nicaragua
    "PA", // Panamá
    "PY", // Paraguay
    "PE", // Perú
    "PR", // Puerto Rico
    "ES", // España
    "UY", // Uruguay
    "VE",
    "US"
      // Venezuela
  ];
  
  export function checkCountryAccess(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
  
    if (pathname === "/api/webhook") return NextResponse.next();
  
    const country = request.headers.get("x-vercel-ip-country");
  
    if (country && !ALLOWED_COUNTRIES.includes(country)) {
      return new NextResponse("Access Denied", { status: 403 });
    }
  
    return null;
  }
  