'use client';

import { useState, useEffect } from 'react';

export default function DailyQuestions() {
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [showAnswer, setShowAnswer] = useState({});
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Default questions to show if no questions in database
  const defaultQuestions = [
    {
      _id: '1',
      subject: 'physics',
      question: 'A ball is thrown vertically upward with an initial velocity of 20 m/s. What is the maximum height reached by the ball? (Take g = 10 m/s²)',
      options: ['10 m', '20 m', '30 m', '40 m'],
      correctAnswer: 1,
      explanation: 'Using v² = u² - 2gh, where v = 0 at maximum height, u = 20 m/s, g = 10 m/s². So, 0 = 400 - 20h, h = 20 m.',
      difficulty: 'medium',
    },
    {
      _id: '2',
      subject: 'maths',
      question: 'Find the derivative of f(x) = x³ + 2x² - 5x + 3',
      options: ['3x² + 4x - 5', '3x² + 2x - 5', 'x² + 4x - 5', '3x² + 4x + 5'],
      correctAnswer: 0,
      explanation: 'Using power rule: d/dx(xⁿ) = nxⁿ⁻¹. So f\'(x) = 3x² + 4x - 5.',
      difficulty: 'medium',
    },
    {
      _id: '3',
      subject: 'physics',
      question: 'Two point charges of +2μC and -2μC are placed 10 cm apart. What is the electric field at the midpoint?',
      options: ['0 N/C', '1.44 × 10⁶ N/C', '2.88 × 10⁶ N/C', '7.2 × 10⁵ N/C'],
      correctAnswer: 2,
      explanation: 'At midpoint, both fields point in the same direction (towards negative charge). E = 2 × kq/r² = 2 × 9×10⁹ × 2×10⁻⁶ / (0.05)² = 2.88 × 10⁶ N/C.',
      difficulty: 'hard',
    },
    {
      _id: '4',
      subject: 'maths',
      question: 'If sin(A) = 3/5 and A is in the first quadrant, find cos(A).',
      options: ['4/5', '3/4', '5/4', '5/3'],
      correctAnswer: 0,
      explanation: 'Using sin²A + cos²A = 1. cos²A = 1 - 9/25 = 16/25. Since A is in first quadrant, cos(A) = 4/5.',
      difficulty: 'easy',
    },
  ];

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await fetch('/api/questions');
      const data = await response.json();
      
      if (data.success && data.questions.length > 0) {
        setQuestions(data.questions);
      } else {
        // Use default questions if none in database
        setQuestions(defaultQuestions);
      }
    } catch (error) {
      console.error('Error fetching questions:', error);
      setQuestions(defaultQuestions);
    } finally {
      setLoading(false);
    }
  };

  const filteredQuestions = selectedSubject === 'all' 
    ? questions 
    : questions.filter(q => q.subject === selectedSubject);

  const toggleAnswer = (id) => {
    setShowAnswer(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-cyan-500 py-20">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <h1 className="text-4xl font-bold text-white md:text-5xl">Daily Practice Questions</h1>
          <p className="mt-4 text-lg text-white/90">
            Sharpen your skills with new questions every day
          </p>
        </div>
      </section>

      {/* Filter */}
      <section className="py-8">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => setSelectedSubject('all')}
              className={`rounded-full px-6 py-2 text-sm font-semibold transition-colors ${
                selectedSubject === 'all'
                  ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900'
                  : 'bg-zinc-200 text-zinc-700 hover:bg-zinc-300 dark:bg-zinc-800 dark:text-zinc-300'
              }`}
            >
              All Subjects
            </button>
            <button
              onClick={() => setSelectedSubject('physics')}
              className={`rounded-full px-6 py-2 text-sm font-semibold transition-colors ${
                selectedSubject === 'physics'
                  ? 'bg-cyan-500 text-white'
                  : 'bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-300'
              }`}
            >
              ⚛️ Physics
            </button>
            <button
              onClick={() => setSelectedSubject('maths')}
              className={`rounded-full px-6 py-2 text-sm font-semibold transition-colors ${
                selectedSubject === 'maths'
                  ? 'bg-lime-500 text-white'
                  : 'bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900 dark:text-green-300'
              }`}
            >
              📐 Mathematics
            </button>
          </div>
        </div>
      </section>

      {/* Questions List */}
      <section className="pb-16">
        <div className="mx-auto max-w-4xl px-6">
          {loading ? (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 animate-spin text-cyan-500" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className="mt-4 text-zinc-500">Loading questions...</p>
            </div>
          ) : (
          <div className="space-y-6">
            {filteredQuestions.map((q) => (
              <div
                key={q._id}
                className="rounded-2xl bg-white p-6 shadow-sm dark:bg-zinc-900"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    q.subject === 'physics' 
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                      : 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                  }`}>
                    {q.subject === 'physics' ? '⚛️ Physics' : '📐 Maths'}
                  </span>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    q.difficulty === 'easy' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' :
                    q.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300' :
                    'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                  }`}>
                    {q.difficulty}
                  </span>
                </div>

                <h3 className="mt-4 text-lg font-semibold text-zinc-900 dark:text-white">
                  {q.question}
                </h3>

                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  {q.options.map((option, index) => (
                    <div
                      key={index}
                      className={`rounded-lg border p-3 text-sm ${
                        showAnswer[q._id] && index === q.correctAnswer
                          ? 'border-green-500 bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300'
                          : 'border-zinc-200 text-zinc-700 dark:border-zinc-700 dark:text-zinc-300'
                      }`}
                    >
                      {String.fromCharCode(65 + index)}. {option}
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => toggleAnswer(q._id)}
                  className="mt-4 text-sm font-semibold text-cyan-500 hover:text-cyan-600 dark:text-cyan-400"
                >
                  {showAnswer[q._id] ? 'Hide Answer' : 'Show Answer'}
                </button>

                {showAnswer[q._id] && (
                  <div className="mt-4 rounded-lg bg-zinc-50 p-4 dark:bg-zinc-800">
                    <p className="text-sm font-semibold text-lime-500 dark:text-lime-400">
                      ✓ Correct Answer: {q.options[q.correctAnswer]}
                    </p>
                    {q.explanation && (
                      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                        <strong>Explanation:</strong> {q.explanation}
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
          )}
        </div>
      </section>

      {/* Subscribe CTA */}
      <section className="bg-zinc-900 py-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl font-bold text-white">Get Daily Questions on WhatsApp</h2>
          <p className="mt-4 text-zinc-400">
            Subscribe to receive daily practice questions directly on your phone.
          </p>
          <a
            href="/contact"
            className="mt-8 inline-block rounded-full bg-lime-500 px-8 py-3 text-lg font-semibold text-white transition-colors hover:bg-lime-600"
          >
            Subscribe Now
          </a>
        </div>
      </section>
    </div>
  );
}
