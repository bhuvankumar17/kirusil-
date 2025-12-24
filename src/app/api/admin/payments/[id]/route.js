import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/mongodb';
import Payment from '@/models/Payment';

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

// GET - Get single payment
export async function GET(request, { params }) {
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
        const payment = await Payment.findById(id);

        if (!payment) {
            return NextResponse.json(
                { error: 'Payment not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            payment
        });
    } catch (error) {
        console.error('Error fetching payment:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to fetch payment' },
            { status: 500 }
        );
    }
}

// PUT - Update payment
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

        const payment = await Payment.findByIdAndUpdate(
            id,
            { ...body, updatedAt: Date.now() },
            { new: true, runValidators: true }
        );

        if (!payment) {
            return NextResponse.json(
                { error: 'Payment not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'Payment updated successfully',
            payment,
        });
    } catch (error) {
        console.error('Error updating payment:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to update payment' },
            { status: 500 }
        );
    }
}

// DELETE - Delete payment
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
        const payment = await Payment.findByIdAndDelete(id);

        if (!payment) {
            return NextResponse.json(
                { error: 'Payment not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'Payment deleted successfully',
        });
    } catch (error) {
        console.error('Error deleting payment:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to delete payment' },
            { status: 500 }
        );
    }
}
