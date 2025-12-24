'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminPayments() {
    const router = useRouter();
    const [payments, setPayments] = useState([]);
    const [stats, setStats] = useState({});
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingPayment, setEditingPayment] = useState(null);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [formData, setFormData] = useState({
        userName: '', userEmail: '', courseName: '', amount: '', amountUSD: '',
        paymentMethod: 'bank_transfer', transactionId: '', status: 'completed', notes: ''
    });

    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (!token) { router.push('/admin/login'); return; }
        fetchPayments();
    }, [router]);

    const fetchPayments = async () => {
        try {
            const token = localStorage.getItem('adminToken');
            const res = await fetch('/api/admin/payments', {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await res.json();
            setPayments(data.payments || []);
            setStats(data.stats || {});
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('adminToken');
        const url = editingPayment ? `/api/admin/payments/${editingPayment._id}` : '/api/admin/payments';
        const method = editingPayment ? 'PUT' : 'POST';

        try {
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify({
                    ...formData,
                    amount: Number(formData.amount),
                    amountUSD: Number(formData.amountUSD),
                }),
            });
            if (res.ok) {
                setMessage({ type: 'success', text: `Payment ${editingPayment ? 'updated' : 'recorded'}!` });
                setShowModal(false);
                setEditingPayment(null);
                resetForm();
                fetchPayments();
            }
        } catch (error) {
            setMessage({ type: 'error', text: error.message });
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Delete this payment record?')) return;
        const token = localStorage.getItem('adminToken');
        await fetch(`/api/admin/payments/${id}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token}` },
        });
        fetchPayments();
    };

    const openEdit = (payment) => {
        setEditingPayment(payment);
        setFormData({
            userName: payment.userName, userEmail: payment.userEmail,
            courseName: payment.courseName, amount: payment.amount, amountUSD: payment.amountUSD,
            paymentMethod: payment.paymentMethod, transactionId: payment.transactionId || '',
            status: payment.status, notes: payment.notes || ''
        });
        setShowModal(true);
    };

    const resetForm = () => {
        setFormData({
            userName: '', userEmail: '', courseName: '', amount: '', amountUSD: '',
            paymentMethod: 'bank_transfer', transactionId: '', status: 'completed', notes: ''
        });
    };

    const getStatusColor = (status) => {
        const colors = {
            completed: 'bg-green-500/20 text-green-400',
            pending: 'bg-yellow-500/20 text-yellow-400',
            failed: 'bg-red-500/20 text-red-400',
            refunded: 'bg-purple-500/20 text-purple-400',
        };
        return colors[status] || 'bg-zinc-500/20 text-zinc-400';
    };

    if (loading) return <div className="min-h-screen bg-zinc-950 flex items-center justify-center"><p className="text-white">Loading...</p></div>;

    return (
        <div className="min-h-screen bg-zinc-950">
            <header className="bg-zinc-900 border-b border-zinc-800 p-4">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div>
                        <h1 className="text-xl font-bold text-white">Payments Management</h1>
                        <Link href="/admin/dashboard" className="text-sm text-zinc-400 hover:text-white">← Back to Dashboard</Link>
                    </div>
                    <button onClick={() => { resetForm(); setEditingPayment(null); setShowModal(true); }}
                        className="px-4 py-2 bg-green-500 text-white rounded-lg">+ Add Payment</button>
                </div>
            </header>

            <main className="max-w-7xl mx-auto p-6">
                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
                        <p className="text-zinc-400 text-sm">Total Payments</p>
                        <p className="text-2xl font-bold text-white">{stats.totalPayments || 0}</p>
                    </div>
                    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
                        <p className="text-zinc-400 text-sm">Completed</p>
                        <p className="text-2xl font-bold text-green-400">{stats.completedPayments || 0}</p>
                    </div>
                    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
                        <p className="text-zinc-400 text-sm">Revenue (INR)</p>
                        <p className="text-2xl font-bold text-white">₹{(stats.totalRevenue || 0).toLocaleString()}</p>
                    </div>
                    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
                        <p className="text-zinc-400 text-sm">Revenue (USD)</p>
                        <p className="text-2xl font-bold text-white">${stats.totalRevenueUSD || 0}</p>
                    </div>
                </div>

                {message.text && (
                    <div className={`mb-4 p-4 rounded-lg ${message.type === 'success' ? 'bg-green-900/50 text-green-300' : 'bg-red-900/50 text-red-300'}`}>
                        {message.text}
                    </div>
                )}

                {/* Payments Table */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-zinc-800">
                            <tr>
                                <th className="text-left p-4 text-zinc-400 text-sm">Student</th>
                                <th className="text-left p-4 text-zinc-400 text-sm">Course</th>
                                <th className="text-left p-4 text-zinc-400 text-sm">Amount</th>
                                <th className="text-left p-4 text-zinc-400 text-sm">Method</th>
                                <th className="text-left p-4 text-zinc-400 text-sm">Status</th>
                                <th className="text-left p-4 text-zinc-400 text-sm">Date</th>
                                <th className="text-left p-4 text-zinc-400 text-sm">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.map((payment) => (
                                <tr key={payment._id} className="border-t border-zinc-800">
                                    <td className="p-4">
                                        <p className="text-white font-medium">{payment.userName}</p>
                                        <p className="text-zinc-400 text-sm">{payment.userEmail}</p>
                                    </td>
                                    <td className="p-4 text-white">{payment.courseName}</td>
                                    <td className="p-4">
                                        <p className="text-white">₹{payment.amount?.toLocaleString()}</p>
                                        <p className="text-zinc-400 text-sm">${payment.amountUSD}</p>
                                    </td>
                                    <td className="p-4 text-zinc-300 capitalize">{payment.paymentMethod?.replace('_', ' ')}</td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(payment.status)}`}>
                                            {payment.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-zinc-400 text-sm">
                                        {new Date(payment.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="p-4">
                                        <button onClick={() => openEdit(payment)} className="text-cyan-400 hover:text-cyan-300 mr-3">Edit</button>
                                        <button onClick={() => handleDelete(payment._id)} className="text-red-400 hover:text-red-300">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {payments.length === 0 && (
                        <div className="text-center py-12 text-zinc-400">No payments yet.</div>
                    )}
                </div>
            </main>

            {showModal && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
                    <div className="bg-zinc-900 rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6">
                        <h2 className="text-xl font-bold text-white mb-4">{editingPayment ? 'Edit' : 'Record'} Payment</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input type="text" placeholder="Student Name" required value={formData.userName}
                                onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
                                className="w-full px-4 py-2 bg-zinc-800 text-white rounded-lg" />
                            <input type="email" placeholder="Student Email" required value={formData.userEmail}
                                onChange={(e) => setFormData({ ...formData, userEmail: e.target.value })}
                                className="w-full px-4 py-2 bg-zinc-800 text-white rounded-lg" />
                            <input type="text" placeholder="Course Name" required value={formData.courseName}
                                onChange={(e) => setFormData({ ...formData, courseName: e.target.value })}
                                className="w-full px-4 py-2 bg-zinc-800 text-white rounded-lg" />
                            <div className="grid grid-cols-2 gap-4">
                                <input type="number" placeholder="Amount (INR)" required value={formData.amount}
                                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                                    className="px-4 py-2 bg-zinc-800 text-white rounded-lg" />
                                <input type="number" placeholder="Amount (USD)" required value={formData.amountUSD}
                                    onChange={(e) => setFormData({ ...formData, amountUSD: e.target.value })}
                                    className="px-4 py-2 bg-zinc-800 text-white rounded-lg" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <select value={formData.paymentMethod} onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                                    className="px-4 py-2 bg-zinc-800 text-white rounded-lg">
                                    <option value="paypal">PayPal</option>
                                    <option value="bank_transfer">Bank Transfer</option>
                                    <option value="upi">UPI</option>
                                    <option value="card">Card</option>
                                    <option value="cash">Cash</option>
                                </select>
                                <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                    className="px-4 py-2 bg-zinc-800 text-white rounded-lg">
                                    <option value="completed">Completed</option>
                                    <option value="pending">Pending</option>
                                    <option value="failed">Failed</option>
                                    <option value="refunded">Refunded</option>
                                </select>
                            </div>
                            <input type="text" placeholder="Transaction ID (optional)" value={formData.transactionId}
                                onChange={(e) => setFormData({ ...formData, transactionId: e.target.value })}
                                className="w-full px-4 py-2 bg-zinc-800 text-white rounded-lg" />
                            <textarea placeholder="Notes (optional)" value={formData.notes}
                                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                className="w-full px-4 py-2 bg-zinc-800 text-white rounded-lg" rows={2} />
                            <div className="flex gap-3">
                                <button type="button" onClick={() => setShowModal(false)}
                                    className="flex-1 px-4 py-2 bg-zinc-800 text-white rounded-lg">Cancel</button>
                                <button type="submit" className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg">
                                    {editingPayment ? 'Update' : 'Record'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
