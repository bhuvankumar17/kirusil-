'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminDashboard() {
  const router = useRouter();
  const [admin, setAdmin] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [filter, setFilter] = useState('all');
  const [formData, setFormData] = useState({
    subject: 'physics',
    question: '',
    options: ['', '', '', ''],
    correctAnswer: 0,
    explanation: '',
    difficulty: 'medium',
  });
  const [submitLoading, setSubmitLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    // Check if admin is logged in
    const token = localStorage.getItem('adminToken');
    const adminUser = localStorage.getItem('adminUser');

    if (!token || !adminUser) {
      router.push('/admin/login');
      return;
    }

    setAdmin(JSON.parse(adminUser));
    fetchQuestions();
  }, [router]);

  const fetchQuestions = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/admin/questions', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch questions');
      }

      const data = await response.json();
      setQuestions(data.questions || []);
    } catch (error) {
      console.error('Error fetching questions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    router.push('/admin/login');
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...formData.options];
    newOptions[index] = value;
    setFormData({ ...formData, options: newOptions });
  };

  const resetForm = () => {
    setFormData({
      subject: 'physics',
      question: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
      explanation: '',
      difficulty: 'medium',
    });
  };

  const handleAddQuestion = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/admin/questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to add question');
      }

      setMessage({ type: 'success', text: 'Question added successfully!' });
      resetForm();
      setShowAddModal(false);
      fetchQuestions();
    } catch (error) {
      setMessage({ type: 'error', text: error.message });
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleEditQuestion = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`/api/admin/questions/${editingQuestion._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update question');
      }

      setMessage({ type: 'success', text: 'Question updated successfully!' });
      setShowEditModal(false);
      setEditingQuestion(null);
      fetchQuestions();
    } catch (error) {
      setMessage({ type: 'error', text: error.message });
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleDeleteQuestion = async (questionId) => {
    if (!confirm('Are you sure you want to delete this question?')) return;

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`/api/admin/questions/${questionId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete question');
      }

      setMessage({ type: 'success', text: 'Question deleted successfully!' });
      fetchQuestions();
    } catch (error) {
      setMessage({ type: 'error', text: error.message });
    }
  };

  const openEditModal = (question) => {
    setEditingQuestion(question);
    setFormData({
      subject: question.subject,
      question: question.question,
      options: question.options,
      correctAnswer: question.correctAnswer,
      explanation: question.explanation || '',
      difficulty: question.difficulty,
    });
    setShowEditModal(true);
  };

  const filteredQuestions = filter === 'all' 
    ? questions 
    : questions.filter(q => q.subject === filter);

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="text-center">
          <svg className="mx-auto h-12 w-12 animate-spin text-cyan-500" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="mt-4 text-zinc-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Header */}
      <header className="bg-zinc-900 border-b border-zinc-800 sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Admin Dashboard</h1>
              <p className="text-sm text-zinc-400">Manage Daily Questions</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-zinc-400">
              Welcome, <span className="text-white font-medium">{admin?.username}</span>
            </span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-900/30 rounded-lg transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8">
        {/* Message */}
        {message.text && (
          <div className={`mb-6 p-4 rounded-xl ${message.type === 'success' ? 'bg-green-900/50 border border-green-800 text-green-300' : 'bg-red-900/50 border border-red-800 text-red-300'}`}>
            {message.text}
          </div>
        )}

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4 mb-8">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/20 text-cyan-400">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{questions.length}</p>
                <p className="text-sm text-zinc-400">Total Questions</p>
              </div>
            </div>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/20 text-blue-400">
                ⚛️
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{questions.filter(q => q.subject === 'physics').length}</p>
                <p className="text-sm text-zinc-400">Physics Questions</p>
              </div>
            </div>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-lime-500/20 text-lime-400">
                📐
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{questions.filter(q => q.subject === 'maths').length}</p>
                <p className="text-sm text-zinc-400">Maths Questions</p>
              </div>
            </div>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-500/20 text-green-400">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{questions.filter(q => q.isActive).length}</p>
                <p className="text-sm text-zinc-400">Active Questions</p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === 'all' ? 'bg-cyan-500 text-white' : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'}`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('physics')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === 'physics' ? 'bg-blue-500 text-white' : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'}`}
            >
              Physics
            </button>
            <button
              onClick={() => setFilter('maths')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === 'maths' ? 'bg-lime-500 text-white' : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'}`}
            >
              Maths
            </button>
          </div>
          <button
            onClick={() => { resetForm(); setShowAddModal(true); }}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-lime-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Question
          </button>
        </div>

        {/* Questions List */}
        <div className="space-y-4">
          {filteredQuestions.length === 0 ? (
            <div className="text-center py-12 bg-zinc-900 border border-zinc-800 rounded-2xl">
              <svg className="mx-auto h-12 w-12 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="mt-4 text-zinc-400">No questions found. Add your first question!</p>
            </div>
          ) : (
            filteredQuestions.map((question, index) => (
              <div key={question._id} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${question.subject === 'physics' ? 'bg-blue-500/20 text-blue-400' : 'bg-lime-500/20 text-lime-400'}`}>
                        {question.subject === 'physics' ? '⚛️ Physics' : '📐 Maths'}
                      </span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        question.difficulty === 'easy' ? 'bg-green-500/20 text-green-400' :
                        question.difficulty === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {question.difficulty}
                      </span>
                    </div>
                    <h3 className="text-white font-medium mb-3">{question.question}</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {question.options.map((option, optIndex) => (
                        <div
                          key={optIndex}
                          className={`px-3 py-2 rounded-lg text-sm ${optIndex === question.correctAnswer ? 'bg-green-500/20 text-green-400 border border-green-500/50' : 'bg-zinc-800 text-zinc-400'}`}
                        >
                          {String.fromCharCode(65 + optIndex)}. {option}
                          {optIndex === question.correctAnswer && ' ✓'}
                        </div>
                      ))}
                    </div>
                    {question.explanation && (
                      <p className="mt-3 text-sm text-zinc-500">
                        <span className="font-medium">Explanation:</span> {question.explanation}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => openEditModal(question)}
                      className="p-2 text-zinc-400 hover:text-cyan-400 hover:bg-cyan-500/10 rounded-lg transition-colors"
                    >
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDeleteQuestion(question._id)}
                      className="p-2 text-zinc-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      {/* Add Question Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Add New Question</h2>
              <button onClick={() => setShowAddModal(false)} className="text-zinc-400 hover:text-white">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form onSubmit={handleAddQuestion} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">Subject</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full rounded-xl bg-zinc-800 px-4 py-3 text-white border-0 focus:ring-2 focus:ring-cyan-500"
                  >
                    <option value="physics">Physics</option>
                    <option value="maths">Mathematics</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">Difficulty</label>
                  <select
                    value={formData.difficulty}
                    onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                    className="w-full rounded-xl bg-zinc-800 px-4 py-3 text-white border-0 focus:ring-2 focus:ring-cyan-500"
                  >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">Question</label>
                <textarea
                  value={formData.question}
                  onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                  required
                  rows={3}
                  className="w-full rounded-xl bg-zinc-800 px-4 py-3 text-white border-0 focus:ring-2 focus:ring-cyan-500"
                  placeholder="Enter your question..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">Options</label>
                <div className="space-y-2">
                  {formData.options.map((option, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-zinc-700 text-white text-sm font-medium">
                        {String.fromCharCode(65 + index)}
                      </span>
                      <input
                        type="text"
                        value={option}
                        onChange={(e) => handleOptionChange(index, e.target.value)}
                        required
                        className="flex-1 rounded-xl bg-zinc-800 px-4 py-2 text-white border-0 focus:ring-2 focus:ring-cyan-500"
                        placeholder={`Option ${String.fromCharCode(65 + index)}`}
                      />
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, correctAnswer: index })}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${formData.correctAnswer === index ? 'bg-green-500 text-white' : 'bg-zinc-700 text-zinc-400 hover:bg-zinc-600'}`}
                      >
                        {formData.correctAnswer === index ? '✓ Correct' : 'Set Correct'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">Explanation (Optional)</label>
                <textarea
                  value={formData.explanation}
                  onChange={(e) => setFormData({ ...formData, explanation: e.target.value })}
                  rows={2}
                  className="w-full rounded-xl bg-zinc-800 px-4 py-3 text-white border-0 focus:ring-2 focus:ring-cyan-500"
                  placeholder="Explain the answer..."
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-3 bg-zinc-800 text-zinc-300 rounded-xl font-medium hover:bg-zinc-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitLoading}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-cyan-500 to-lime-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50"
                >
                  {submitLoading ? 'Adding...' : 'Add Question'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Question Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Edit Question</h2>
              <button onClick={() => { setShowEditModal(false); setEditingQuestion(null); }} className="text-zinc-400 hover:text-white">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form onSubmit={handleEditQuestion} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">Subject</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full rounded-xl bg-zinc-800 px-4 py-3 text-white border-0 focus:ring-2 focus:ring-cyan-500"
                  >
                    <option value="physics">Physics</option>
                    <option value="maths">Mathematics</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">Difficulty</label>
                  <select
                    value={formData.difficulty}
                    onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                    className="w-full rounded-xl bg-zinc-800 px-4 py-3 text-white border-0 focus:ring-2 focus:ring-cyan-500"
                  >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">Question</label>
                <textarea
                  value={formData.question}
                  onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                  required
                  rows={3}
                  className="w-full rounded-xl bg-zinc-800 px-4 py-3 text-white border-0 focus:ring-2 focus:ring-cyan-500"
                  placeholder="Enter your question..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">Options</label>
                <div className="space-y-2">
                  {formData.options.map((option, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-zinc-700 text-white text-sm font-medium">
                        {String.fromCharCode(65 + index)}
                      </span>
                      <input
                        type="text"
                        value={option}
                        onChange={(e) => handleOptionChange(index, e.target.value)}
                        required
                        className="flex-1 rounded-xl bg-zinc-800 px-4 py-2 text-white border-0 focus:ring-2 focus:ring-cyan-500"
                        placeholder={`Option ${String.fromCharCode(65 + index)}`}
                      />
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, correctAnswer: index })}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${formData.correctAnswer === index ? 'bg-green-500 text-white' : 'bg-zinc-700 text-zinc-400 hover:bg-zinc-600'}`}
                      >
                        {formData.correctAnswer === index ? '✓ Correct' : 'Set Correct'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">Explanation (Optional)</label>
                <textarea
                  value={formData.explanation}
                  onChange={(e) => setFormData({ ...formData, explanation: e.target.value })}
                  rows={2}
                  className="w-full rounded-xl bg-zinc-800 px-4 py-3 text-white border-0 focus:ring-2 focus:ring-cyan-500"
                  placeholder="Explain the answer..."
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => { setShowEditModal(false); setEditingQuestion(null); }}
                  className="flex-1 px-4 py-3 bg-zinc-800 text-zinc-300 rounded-xl font-medium hover:bg-zinc-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitLoading}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-cyan-500 to-lime-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50"
                >
                  {submitLoading ? 'Updating...' : 'Update Question'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
