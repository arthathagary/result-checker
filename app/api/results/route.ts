import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import Result from "@/models/Result";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const results = await Result.find();
    return NextResponse.json(results, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: `Error: ${error}` }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { name, dob, town, district, courseName, courseDuration } =
      await req.json();
    const person = new Result({
      name: name,
      dob: dob,
      town: town,
      district: district,
      courseName: courseName,
      courseDuration: courseDuration,
    });
    await person.save();
    return NextResponse.json(
      { message: `Details store successfully` },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: `Error: ${error}` }, { status: 500 });
  }
}
