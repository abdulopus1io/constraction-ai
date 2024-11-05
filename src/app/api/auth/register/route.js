// src/app/api/auth/register/route.js
import bcrypt from "bcryptjs";
import clientPromise from "../../../lib/mongoDB";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { email, password } = await req.json();

  const client = await clientPromise;
  const usersCollection = client.db().collection("users");

  const existingUser = await usersCollection.findOne({ email });
  if (existingUser) {
    return NextResponse.json({ message: "User already exists" }, { status: 422 });
  }

  const hashedPassword = bcrypt.hashSync(password, 12);

  const newUser = {
    email,
    password: hashedPassword,
    createdAt: new Date()
  };

  await usersCollection.insertOne(newUser);

  return NextResponse.json({ message: "User created" }, { status: 201 });
}
