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
    const {
      certificateNo,
      name,
      dob,
      town,
      district,
      course,
      competition,
      courseDuration,
      result,
      leactureName,
      issueDate,
      nic,
    } = await req.json();
    const person = new Result({
      certificateNo: certificateNo,
      name: name,
      dob: dob,
      town: town,
      district: district,
      course: course,
      competition: competition,
      courseDuration: courseDuration,
      result: result,
      leactureName: leactureName,
      issueDate: issueDate,
      nic: nic,
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
