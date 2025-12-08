import dbConnect from '@/lib/mongodb';
import Contact from '@/models/Contact';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    await dbConnect();

    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'Please fill all fields' },
        { status: 400 }
      );
    }

    const contact = await Contact.create({
      name,
      email,
      message,
    });

    return NextResponse.json(
      { success: true, data: contact },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await dbConnect();

    const contacts = await Contact.find({}).sort({ createdAt: -1 });

    return NextResponse.json(
      { success: true, data: contacts },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
