import { NextResponse } from "next/server";

const VALID_USERS = [
  { email: "admin@interswitch.com", password: "admin234" },
  { email: "user@interswitch.com", password: "user234" },
];

export async function POST(request: Request) {
  const body = await request.json();
  const { email, password } = body;

  if (!email || !password) {
    return NextResponse.json(
      {
        error: { message: "Email and password are required" },
      },
      { status: 400 }
    );
  }

  const validUser = VALID_USERS.find(
    (user) => user.email === email && user.password === password
  );

  if (!validUser) {
    return NextResponse.json(
      {
        error: { message: "Invalid login credentials" },
      },
      { status: 401 }
    );
  }

  // Generate a simple token tied to the user email. Do NOT use this in production.
  const token = Buffer.from(`${email}:${Date.now()}`).toString("base64");
  return NextResponse.json({
    data: { token },
    message: "Login successful",
  });
}
