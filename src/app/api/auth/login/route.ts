import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  
  // Return a mock user
  return NextResponse.json({
    id: "user-1",
    name: body.phone === "admin" ? "Admin User" : "Hasanboy Dehqon",
    phone: body.phone,
    role: body.phone === "admin" ? "ADMIN" : "FARMER",
    region: "Toshkent"
  });
}
