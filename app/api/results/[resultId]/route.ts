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
  const { resultId } = params;
  const body = await req.json();

  try {
    await connectDB();
    const result = await Result.findOneAndUpdate(
      { certificateNo: resultId },
      body,
      {
        new: true,
      }
    );

    if (!result) {
      return NextResponse.json(
        { message: "Result not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(result, { status: 200 });
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
