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

// GET - List all payments
export async function GET(request) {
    try {
        const admin = verifyAdmin(request);
        if (!admin) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        await dbConnect();

        const payments = await Payment.find({}).sort({ createdAt: -1 });

        // Calculate stats
        const totalPayments = payments.length;
        const completedPayments = payments.filter(p => p.status === 'completed').length;
        const totalRevenue = payments
            .filter(p => p.status === 'completed')
            .reduce((sum, p) => sum + p.amount, 0);
        const totalRevenueUSD = payments
            .filter(p => p.status === 'completed')
            .reduce((sum, p) => sum + p.amountUSD, 0);

        return NextResponse.json({
            success: true,
            payments,
            stats: {
                totalPayments,
                completedPayments,
                totalRevenue,
                totalRevenueUSD,
            }
        });
    } catch (error) {
        console.error('Error fetching payments:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to fetch payments' },
            { status: 500 }
        );
    }
}

// POST - Create new payment record (manual entry)
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
        const {
            userName,
            userEmail,
            courseName,
            amount,
            amountUSD,
            paymentMethod,
            transactionId,
            status,
            notes
        } = body;

        if (!userName || !userEmail || !courseName || !amount || !amountUSD) {
            return NextResponse.json(
                { error: 'Please provide all required fields' },
                { status: 400 }
            );
        }

        const payment = await Payment.create({
            userName,
            userEmail,
            courseName,
            amount,
            amountUSD,
            paymentMethod: paymentMethod || 'other',
            transactionId,
            status: status || 'completed',
            notes,
        });

        return NextResponse.json({
            success: true,
            message: 'Payment record created successfully',
            payment,
        });
    } catch (error) {
        console.error('Error creating payment:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to create payment' },
            { status: 500 }
        );
    }
}
