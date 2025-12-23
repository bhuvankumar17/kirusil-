import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Question from '@/models/Question';

// Public API to fetch active questions for the daily questions page
export async function GET(request) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const subject = searchParams.get('subject');
    
    let query = { isActive: true };
    
    if (subject && subject !== 'all') {
      query.subject = subject;
    }

    // Get today's questions (could be filtered by date or just get random active ones)
    const questions = await Question.find(query)
      .select('subject question options correctAnswer explanation difficulty')
      .sort({ date: -1 })
      .limit(10);

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
