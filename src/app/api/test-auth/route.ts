import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Test if we can reach the Better Auth endpoints
    const baseUrl = request.nextUrl.origin;
    
    const testResponse = await fetch(`${baseUrl}/api/auth/session`, {
      method: "GET",
      headers: {
        "User-Agent": request.headers.get("user-agent") || "",
      },
    });

    const sessionData = await testResponse.json();

    return NextResponse.json({
      message: "Better Auth test",
      baseUrl,
      sessionEndpointStatus: testResponse.status,
      sessionData,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json({
      error: "Test failed",
      message: error instanceof Error ? error.message : String(error),
    }, { status: 500 });
  }
} 