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
    const results = await Result.find({ nic: nicNo });
    return NextResponse.json(results || [], { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: `Error: ${error}` }, { status: 500 });
  }
}
