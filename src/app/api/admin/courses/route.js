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

// GET - List all courses
export async function GET(request) {
    try {
        await dbConnect();

        const courses = await Course.find({}).sort({ order: 1, createdAt: -1 });

        return NextResponse.json({
            success: true,
            courses
        });
    } catch (error) {
        console.error('Error fetching courses:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to fetch courses' },
            { status: 500 }
        );
    }
}

// POST - Create new course
export async function POST(request) {
    try {
        const admin = verifyAdmin(request);
        if (!admin) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        await dbConnect();

        const body = await request.json();
        const { title, description, topics, duration, price, priceUSD, color, category, features, isPopular, order } = body;

        if (!title || !description || !price || !priceUSD) {
            return NextResponse.json(
                { error: 'Please provide all required fields' },
                { status: 400 }
            );
        }

        const course = await Course.create({
            title,
            description,
            topics: topics || [],
            duration: duration || '12 months',
            price,
            priceUSD,
            color: color || 'blue',
            category: category || 'physics',
            features: features || [],
            isPopular: isPopular || false,
            order: order || 0,
        });

        return NextResponse.json({
            success: true,
            message: 'Course created successfully',
            course,
        });
    } catch (error) {
        console.error('Error creating course:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to create course' },
            { status: 500 }
        );
    }
}
