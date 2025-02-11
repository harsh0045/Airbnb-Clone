import bcrypt from "bcrypt";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";


export async function POST(request: Request) {
  try {
    const body = await request.json() ;
    const { email, name, password } = body;

    // Validate required fields
    if (!email || !name || !password) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    console.log("Creating User:", { email, name, hashedPassword });

    // Ensure the field name matches your Prisma schema
    const user = await prisma.user.create({
      data: {
        email:email,
        name:name,
        hashedPassword:hashedPassword, // 🔄 Ensure correct field name
      },
    });
    if (!user) {
      console.log("User creation failed!");
      return NextResponse.json({ error: "User creation failed" }, { status: 500 });
    }
    return NextResponse.json( user);
  } catch (error:any) {
    console.log("Prisma Error:", error.stack,error.message);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
