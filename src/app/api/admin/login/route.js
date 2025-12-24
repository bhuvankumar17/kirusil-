import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/mongodb';
import Admin from '@/models/Admin';

export async function POST(request) {
  try {
    await dbConnect();

    const { username, email, password } = await request.json();

    // Validate input - accept either username or email
    const loginIdentifier = username || email;
    if (!loginIdentifier || !password) {
      return NextResponse.json(
        { error: 'Please provide username/email and password' },
        { status: 400 }
      );
    }

    // Find admin by username OR email
    const admin = await Admin.findOne({
      $or: [
        { username: loginIdentifier },
        { email: loginIdentifier.toLowerCase() }
      ]
    }).select('+password');

    if (!admin) {
      console.log('Admin not found for:', loginIdentifier);
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Check password
    const isMatch = await admin.comparePassword(password);

    if (!isMatch) {
      console.log('Password mismatch for:', loginIdentifier);
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Create JWT token
    const token = jwt.sign(
      { id: admin._id, username: admin.username, role: admin.role },
      process.env.NEXTAUTH_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    return NextResponse.json({
      success: true,
      token,
      admin: {
        id: admin._id,
        username: admin.username,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error('Admin login error:', error);
    return NextResponse.json(
      { error: error.message || 'Server error. Please try again.' },
      { status: 500 }
    );
  }
}
