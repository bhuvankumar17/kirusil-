import dbConnect from '@/lib/mongodb';
import Contact from '@/models/Contact';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request) {
  try {
    await dbConnect();

    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'Please fill all required fields' },
        { status: 400 }
      );
    }

    // Save to MongoDB
    const contact = await Contact.create({
      name,
      email,
      phone: phone || '',
      subject: subject || 'General Inquiry',
      message,
    });

    // Send email notification via Resend
    try {
      if (process.env.RESEND_API_KEY) {
        const resend = new Resend(process.env.RESEND_API_KEY);
        await resend.emails.send({
          from: 'Kurisil Contact Form <onboarding@resend.dev>',
          to: 'kirusildata@gmail.com',
          subject: `New Contact Form Submission: ${subject || 'General Inquiry'}`,
          html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(to right, #2563eb, #16a34a); padding: 20px; border-radius: 10px 10px 0 0;">
              <h1 style="color: white; margin: 0; font-size: 24px;">New Contact Form Submission</h1>
            </div>
            <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #374151;">Name:</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #1f2937;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #374151;">Email:</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #1f2937;"><a href="mailto:${email}" style="color: #2563eb;">${email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #374151;">Phone:</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #1f2937;">${phone || 'Not provided'}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #374151;">Subject:</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #1f2937;">${subject || 'General Inquiry'}</td>
                </tr>
              </table>
              <div style="margin-top: 20px;">
                <p style="font-weight: bold; color: #374151; margin-bottom: 10px;">Message:</p>
                <div style="background: white; padding: 15px; border-radius: 8px; border: 1px solid #e5e7eb;">
                  <p style="color: #1f2937; margin: 0; white-space: pre-wrap;">${message}</p>
                </div>
              </div>
              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center;">
                <p style="color: #6b7280; font-size: 12px; margin: 0;">This email was sent from the Kurisil Academy contact form.</p>
              </div>
            </div>
          </div>
        `,
        });
      }
    } catch (emailError) {
      console.error('Failed to send email:', emailError);
      // Continue even if email fails - data is saved to MongoDB
    }

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
