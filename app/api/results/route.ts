import connectDB from "@/lib/connectDB";
import Result from "@/models/Result";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const results = await Result.find();
    const numberOfResults = results.length;
    return NextResponse.json(
      { results, count: numberOfResults },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: `Error: ${error}` }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.SECRET });
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();
    const {
      certificateNo,
      name,
      dob,
      gender,
      town,
      district,
      course,
      competition,
      courseDuration,
      result,
      lectureName,
      founderName,
      registrationNo,
      issueDate,
      nic,
    } = await req.json();

    const person = new Result({
      certificateNo: certificateNo,
      name: name,
      dob: dob,
      gender: gender,
      town: town,
      district: district,
      course: course,
      competition: competition,
      courseDuration: courseDuration,
      result: result,
      leactureName: lectureName.teacherNames,
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
