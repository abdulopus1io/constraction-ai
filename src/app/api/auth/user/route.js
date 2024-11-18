import { connectMongoDB } from "../../../lib/mongoDB";
import User from "../../../models/user";
import { NextResponse } from "next/server";

// export async function POST(request) {
//   const { name, email } = await request.json();
//   await connectMongoDB();
//   await User.create({ name, email });
//   return NextResponse.json({ message: "User Registered" }, { status: 201 });
// }
export async function POST(request) {
  const { name, email, password } = await request.json();

  await connectMongoDB();
  // Check if the user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return NextResponse.json({ message: "User already exists" }, { status: 409 });
  }

  // Hash the password before saving
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a new user with the hashed password
  await User.create({ name, email, password: hashedPassword });

  return NextResponse.json({ message: "User Registered" }, { status: 201 });
}