import connectDB from "@/lib/connectDB";
import { NextRequest, NextResponse } from "next/server";
import Result from "@/models/Result";

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
  const { resultId } = params;
  console.log(resultId);
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
