import connectDB from "@/lib/connectDB";
import { NextRequest, NextResponse } from "next/server";
import Result from "@/models/Result";

interface IParam {
  nicNo: string;
}
export async function GET(req: NextRequest, { params }: { params: IParam }) {
  const { nicNo } = params;
  try {
    await connectDB();
    const result = await Result.findOne({ nic: nicNo });
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: `Error: ${error}` }, { status: 500 });
  }
}

// PUT endpoint
export async function PUT(req: NextRequest, { params }: { params: IParam }) {
  const { nicNo } = params;
  const body = await req.json();
  try {
    await connectDB();
    const result = await Result.findOneAndUpdate({ nic: nicNo }, body, {
      new: true,
    });

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
  const { nicNo } = params;
  try {
    await connectDB();
    const result = await Result.findOneAndDelete({ nic: nicNo });

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
