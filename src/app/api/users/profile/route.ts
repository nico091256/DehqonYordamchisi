import { NextResponse } from 'next/server';

export async function GET() {
  // Mock missing token / not logged in
  // Return 401 so the frontend handles it properly
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}
