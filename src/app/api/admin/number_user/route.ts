import connectDB from "@/app/config/connectDB";
import TotalUser from "@/app/models/numberUser";
import { NextResponse } from "next/server";
export const revalidate = 0;

export async function GET() {
  await connectDB();
  try {
    const totalUser = await TotalUser.find();
    if (totalUser) {
      return NextResponse.json({
        message: "Get product Successfully",
        status: 200,
        data: totalUser,
      });
    }
    return NextResponse.json({
      message: "Get product Failed",
      status: 400,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
