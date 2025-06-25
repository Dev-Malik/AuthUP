import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const token = url.searchParams.get("token");
    const callbackUrl = url.searchParams.get("callbackUrl") || "/email-verified";

    console.log("🔍 Verification attempt with token:", token?.substring(0, 20) + "...");

    if (!token) {
      console.log("❌ No token provided");
      return NextResponse.redirect(new URL("/email-verified?error=missing-token", request.url));
    }

    // Call the Better Auth verification endpoint with GET method and token in URL
    const verifyUrl = `${request.nextUrl.origin}/api/auth/verify-email?token=${token}`;
    console.log("📞 Calling verification endpoint:", verifyUrl);

    const verificationResponse = await fetch(verifyUrl, {
      method: "GET",
      headers: {
        "User-Agent": request.headers.get("user-agent") || "",
        "Cookie": request.headers.get("cookie") || "",
      },
    });

    console.log("📋 Verification response status:", verificationResponse.status);
    
    let responseData;
    try {
      responseData = await verificationResponse.json();
      console.log("📄 Verification response data:", responseData);
    } catch (parseError) {
      console.log("⚠️ Failed to parse response as JSON");
      responseData = null;
    }

    // Check if verification was successful
    if (verificationResponse.ok && responseData && responseData.user) {
      console.log("✅ Verification successful!");
      return NextResponse.redirect(new URL(`${callbackUrl}?success=true`, request.url));
    } else if (verificationResponse.ok) {
      console.log("✅ Verification response OK but no user data");
      return NextResponse.redirect(new URL(`${callbackUrl}?success=true`, request.url));
    } else {
      console.log("❌ Verification failed:", responseData?.message || "Unknown error");
      return NextResponse.redirect(new URL(`${callbackUrl}?error=verification-failed`, request.url));
    }
  } catch (error) {
    console.error("💥 Email verification error:", error);
    return NextResponse.redirect(new URL("/email-verified?error=server-error", request.url));
  }
} 