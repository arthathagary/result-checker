import connectDB from "@/lib/connectDB";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    // const { userName, password } = await req.json();
    const userName = "agary";
    const password = "agary1234";
    const hashedPassword = await bcrypt.hash(password, 10);
    await connectDB();
    await User.create({ userName, password: hashedPassword });

    return NextResponse.json({ message: "User registered." }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while registering the user." },
      { status: 500 }
    );
  }
}
