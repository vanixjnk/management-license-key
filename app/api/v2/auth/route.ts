import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { connectToDatabase } from "@/lib/mongdb";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();
  
  const { db } = await connectToDatabase();
  const collection = db.collection("admin");

  console.log("Received credentials:", { email, password });

  const user = await collection.findOne({ email });

  if (user && await bcrypt.compare(password, user.password)) {
    console.log("User authenticated:", user);
    const response = NextResponse.json({ account: "true" });
    response.cookies.set("user-auth", "true", { httpOnly: true });
    return response;
  } else {
    console.log("Authentication failed for:", { email, password });
    return NextResponse.json({ message: "Authentication failed" }, { status: 401 });
  }
}