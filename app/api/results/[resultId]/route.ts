import connectDB from "@/lib/connectDB";
import { NextRequest, NextResponse } from "next/server";
import Result from "@/models/Result";
import { getToken } from "next-auth/jwt";

interface IParam {
  resultId: string;
}
export async function GET(req: NextRequest, { params }: { params: IParam }) {
  const { resultId } = params;
  try {
    await connectDB();
    const result = await Result.find({ certificateNo: resultId });
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: `Error: ${error}` }, { status: 500 });
  }
}

// PUT endpoint
export async function PUT(req: NextRequest, { params }: { params: IParam }) {
  const token = await getToken({ req, secret: process.env.SECRET });
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  // const { resultId } = params;
  // const body = await req.json();

  try {
    await connectDB();
    const { resultId } = params;
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

    // Find the existing result
    // const result2 = await Result.findOne({ certificateNo: resultId });
    // if (!result2) {
    //   return NextResponse.json(
    //     { message: "Result not found" },
    //     { status: 404 }
    //   );
    // }

    // Handle lectureName update carefully
    // if (body.lectureName && body.lectureName.teacherNames) {
    //   result.lectureName = body.lectureName.teacherNames; // Directly assign the new teacherNames array
    // }

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
    // Update other fields
    const result2 = await Result.findOneAndUpdate(
      { certificateNo: resultId },
      {
        $set: {
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
        },
      }
    );

    return NextResponse.json(result2, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: `Error: ${error}` }, { status: 500 });
  }
}

// DELETE endpoint
export async function DELETE(req: NextRequest, { params }: { params: IParam }) {
  const token = await getToken({ req, secret: process.env.SECRET });
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const { resultId } = params;

  try {
    await connectDB();
    const result = await Result.findOneAndDelete({ _id: resultId });

    if (!result) {
      return NextResponse.json(
        { message: "Result not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Result deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: `Error: ${error}` }, { status: 500 });
  }
}
