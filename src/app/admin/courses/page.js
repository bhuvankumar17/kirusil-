'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminCourses() {
    const router = useRouter();
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingCourse, setEditingCourse] = useState(null);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [formData, setFormData] = useState({
        title: '', description: '', topics: '', duration: '12 months',
        price: '', priceUSD: '', color: 'blue', category: 'physics',
        features: '', isPopular: false, order: 0
    });

    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (!token) { router.push('/admin/login'); return; }
        fetchCourses();
    }, [router]);

    const fetchCourses = async () => {
        try {
            const res = await fetch('/api/admin/courses');
            const data = await res.json();
            setCourses(data.courses || []);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('adminToken');
        const url = editingCourse ? `/api/admin/courses/${editingCourse._id}` : '/api/admin/courses';
        const method = editingCourse ? 'PUT' : 'POST';

        try {
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify({
                    ...formData,
                    topics: formData.topics.split(',').map(t => t.trim()).filter(Boolean),
                    features: formData.features.split(',').map(f => f.trim()).filter(Boolean),
                    price: Number(formData.price),
                    priceUSD: Number(formData.priceUSD),
                }),
            });
            if (res.ok) {
                setMessage({ type: 'success', text: `Course ${editingCourse ? 'updated' : 'created'}!` });
                setShowModal(false);
                setEditingCourse(null);
                resetForm();
                fetchCourses();
            }
        } catch (error) {
            setMessage({ type: 'error', text: error.message });
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Delete this course?')) return;
        const token = localStorage.getItem('adminToken');
        await fetch(`/api/admin/courses/${id}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token}` },
        });
        fetchCourses();
    };

    const openEdit = (course) => {
        setEditingCourse(course);
        setFormData({
            title: course.title, description: course.description,
            topics: course.topics?.join(', ') || '',
            duration: course.duration, price: course.price, priceUSD: course.priceUSD,
            color: course.color, category: course.category,
            features: course.features?.join(', ') || '',
            isPopular: course.isPopular, order: course.order || 0
        });
        setShowModal(true);
    };

    const resetForm = () => {
        setFormData({
            title: '', description: '', topics: '', duration: '12 months',
            price: '', priceUSD: '', color: 'blue', category: 'physics',
            features: '', isPopular: false, order: 0
        });
    };

    if (loading) return <div className="min-h-screen bg-zinc-950 flex items-center justify-center"><p className="text-white">Loading...</p></div>;

    return (
        <div className="min-h-screen bg-zinc-950">
            <header className="bg-zinc-900 border-b border-zinc-800 p-4">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div>
                        <h1 className="text-xl font-bold text-white">Courses Management</h1>
                        <Link href="/admin/dashboard" className="text-sm text-zinc-400 hover:text-white">← Back to Dashboard</Link>
                    </div>
                    <button onClick={() => { resetForm(); setEditingCourse(null); setShowModal(true); }}
                        className="px-4 py-2 bg-cyan-500 text-white rounded-lg">+ Add Course</button>
                </div>
            </header>

            <main className="max-w-7xl mx-auto p-6">
                {message.text && (
                    <div className={`mb-4 p-4 rounded-lg ${message.type === 'success' ? 'bg-green-900/50 text-green-300' : 'bg-red-900/50 text-red-300'}`}>
                        {message.text}
                    </div>
                )}

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {courses.map((course) => (
                        <div key={course._id} className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                            <div className="flex justify-between">
                                <span className={`px-2 py-1 text-xs rounded-full bg-${course.color}-500/20 text-${course.color}-400`}>
                                    {course.category}
                                </span>
                                {course.isPopular && <span className="px-2 py-1 text-xs rounded-full bg-orange-500 text-white">Popular</span>}
                            </div>
                            <h3 className="mt-3 text-lg font-bold text-white">{course.title}</h3>
                            <p className="mt-1 text-sm text-zinc-400 line-clamp-2">{course.description}</p>
                            <div className="mt-4 flex justify-between text-sm">
                                <span className="text-zinc-400">{course.duration}</span>
                                <span className="text-white font-bold">₹{course.price?.toLocaleString()}</span>
                            </div>
                            <div className="mt-4 flex gap-2">
                                <button onClick={() => openEdit(course)} className="flex-1 px-3 py-2 bg-zinc-800 text-cyan-400 rounded-lg text-sm">Edit</button>
                                <button onClick={() => handleDelete(course._id)} className="flex-1 px-3 py-2 bg-zinc-800 text-red-400 rounded-lg text-sm">Delete</button>
                            </div>
                        </div>
                    ))}
                </div>

                {courses.length === 0 && (
                    <div className="text-center py-12 text-zinc-400">No courses yet. Add your first course!</div>
                )}
            </main>

            {showModal && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
                    <div className="bg-zinc-900 rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6">
                        <h2 className="text-xl font-bold text-white mb-4">{editingCourse ? 'Edit' : 'Add'} Course</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input type="text" placeholder="Title" required value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="w-full px-4 py-2 bg-zinc-800 text-white rounded-lg" />
                            <textarea placeholder="Description" required value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="w-full px-4 py-2 bg-zinc-800 text-white rounded-lg" rows={3} />
                            <input type="text" placeholder="Topics (comma separated)" value={formData.topics}
                                onChange={(e) => setFormData({ ...formData, topics: e.target.value })}
                                className="w-full px-4 py-2 bg-zinc-800 text-white rounded-lg" />
                            <div className="grid grid-cols-2 gap-4">
                                <input type="number" placeholder="Price (INR)" required value={formData.price}
                                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                    className="px-4 py-2 bg-zinc-800 text-white rounded-lg" />
                                <input type="number" placeholder="Price (USD)" required value={formData.priceUSD}
                                    onChange={(e) => setFormData({ ...formData, priceUSD: e.target.value })}
                                    className="px-4 py-2 bg-zinc-800 text-white rounded-lg" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    className="px-4 py-2 bg-zinc-800 text-white rounded-lg">
                                    <option value="physics">Physics</option>
                                    <option value="maths">Maths</option>
                                    <option value="jee">JEE</option>
                                    <option value="neet">NEET</option>
                                </select>
                                <select value={formData.color} onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                                    className="px-4 py-2 bg-zinc-800 text-white rounded-lg">
                                    <option value="blue">Blue</option>
                                    <option value="green">Green</option>
                                    <option value="purple">Purple</option>
                                    <option value="orange">Orange</option>
                                </select>
                            </div>
                            <label className="flex items-center gap-2 text-white">
                                <input type="checkbox" checked={formData.isPopular}
                                    onChange={(e) => setFormData({ ...formData, isPopular: e.target.checked })} />
                                Mark as Popular
                            </label>
                            <div className="flex gap-3">
                                <button type="button" onClick={() => setShowModal(false)}
                                    className="flex-1 px-4 py-2 bg-zinc-800 text-white rounded-lg">Cancel</button>
                                <button type="submit" className="flex-1 px-4 py-2 bg-cyan-500 text-white rounded-lg">
                                    {editingCourse ? 'Update' : 'Create'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
