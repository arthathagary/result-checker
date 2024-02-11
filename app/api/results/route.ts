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
      founderName,
      registrationNo,
      issueDate,
      nic,
    } = await req.json();
    console.log(issueDate);
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
      founderName: founderName,
      registrationNo: registrationNo,
      issueDate: issueDate,
      nic: nic.toUpperCase(),
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
