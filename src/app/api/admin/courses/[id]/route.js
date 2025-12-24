import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/mongodb';
import Course from '@/models/Course';

// Verify admin token
const verifyAdmin = (request) => {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return null;
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET || 'your-secret-key');
        return decoded;
    } catch (error) {
        return null;
    }
};

// GET - Get single course
export async function GET(request, { params }) {
    try {
        await dbConnect();

        const { id } = await params;
        const course = await Course.findById(id);

        if (!course) {
            return NextResponse.json(
                { error: 'Course not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            course
        });
    } catch (error) {
        console.error('Error fetching course:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to fetch course' },
            { status: 500 }
        );
    }
}

// PUT - Update course
export async function PUT(request, { params }) {
    try {
        const admin = verifyAdmin(request);
        if (!admin) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        await dbConnect();

        const { id } = await params;
        const body = await request.json();

        const course = await Course.findByIdAndUpdate(
            id,
            { ...body, updatedAt: Date.now() },
            { new: true, runValidators: true }
        );

        if (!course) {
            return NextResponse.json(
                { error: 'Course not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'Course updated successfully',
            course,
        });
    } catch (error) {
        console.error('Error updating course:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to update course' },
            { status: 500 }
        );
    }
}

// DELETE - Delete course
export async function DELETE(request, { params }) {
    try {
        const admin = verifyAdmin(request);
        if (!admin) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        await dbConnect();

        const { id } = await params;
        const course = await Course.findByIdAndDelete(id);

        if (!course) {
            return NextResponse.json(
                { error: 'Course not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'Course deleted successfully',
        });
    } catch (error) {
        console.error('Error deleting course:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to delete course' },
            { status: 500 }
        );
    }
}
