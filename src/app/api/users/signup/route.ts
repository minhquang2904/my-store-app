import connectDB from "@/app/config/connectDB";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import User from "@/app/models/user";
import { signToken } from "@/app/lib/jwt";
export async function POST(req: NextRequest) {
  await connectDB();
  try {
    const { email, password } = await req.json();

    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json({ message: "User already exists", status: 400 });
    }
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      email: email.toLowerCase(),
      password: hashedPassword,
      role: "user",
    });

    const users = await newUser.save();
    const token = await signToken({
      id: users._id,
      email: users.email,
      role: users.role,
    });
    return NextResponse.json({
      message: "User signed up successfully!",
      status: 200,
      token: token,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
