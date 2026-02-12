import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { contacts } from "@/lib/db/schema";

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const [contact] = await db
      .insert(contacts)
      .values({ name, email, subject, message })
      .returning();

    return NextResponse.json({
      success: true,
      message: "Thank you for contacting us! We'll get back to you soon.",
      id: contact.id,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to submit contact form" },
      { status: 500 }
    );
  }
}
