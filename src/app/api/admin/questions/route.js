import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import connectDB from '@/lib/mongodb';
import Question from '@/models/Question';

// Middleware to verify admin token
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

// GET - Fetch all questions
export async function GET(request) {
  try {
    const admin = verifyAdmin(request);
    
    if (!admin) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();
    
    const questions = await Question.find({}).sort({ createdAt: -1 });
    
    return NextResponse.json({
      success: true,
      questions,
    });
  } catch (error) {
    console.error('Error fetching questions:', error);
    return NextResponse.json(
      { error: 'Server error. Please try again.' },
      { status: 500 }
    );
  }
}

// POST - Create a new question
export async function POST(request) {
  try {
    const admin = verifyAdmin(request);
    
    if (!admin) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();
    
    const body = await request.json();
    const { subject, question, options, correctAnswer, explanation, difficulty } = body;

    // Validate required fields
    if (!subject || !question || !options || options.length !== 4 || correctAnswer === undefined) {
      return NextResponse.json(
        { error: 'Please provide all required fields' },
        { status: 400 }
      );
    }

    const newQuestion = await Question.create({
      subject,
      question,
      options,
      correctAnswer,
      explanation: explanation || '',
      difficulty: difficulty || 'medium',
      createdBy: admin.id,
    });

    return NextResponse.json({
      success: true,
      question: newQuestion,
    });
  } catch (error) {
    console.error('Error creating question:', error);
    return NextResponse.json(
      { error: 'Server error. Please try again.' },
      { status: 500 }
    );
  }
}
