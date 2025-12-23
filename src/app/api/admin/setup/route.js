import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Admin from '@/models/Admin';

// This route is for creating the initial admin - should be disabled after first use
export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();
    const { username, email, password, setupKey } = body;

    console.log('Setup request received:', { username, email, setupKey });

    // Security: Require a setup key to create admin
    if (setupKey !== process.env.ADMIN_SETUP_KEY && setupKey !== 'kurisil-admin-setup-2024') {
      return NextResponse.json(
        { error: 'Invalid setup key' },
        { status: 403 }
      );
    }

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ 
      $or: [{ username }, { email }] 
    });

    if (existingAdmin) {
      return NextResponse.json(
        { error: 'Admin with this username or email already exists' },
        { status: 400 }
      );
    }

    // Create new admin
    const  admin = await Admin.create({
      username,
      email,
      password,
      role: 'superadmin',
    });

    return NextResponse.json({
      success: true,
      message: 'Admin created successfully',
      admin: {
        id: admin._id,
        username: admin.username,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error('Admin setup error:', error);
    return NextResponse.json(
      { error: error.message || 'Server error. Please try again.' },
      { status: 500 }
    );
  }
}
