'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Payment() {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const plans = [
    {
      id: 'physics-11',
      name: 'Physics Class 11',
      price: 15000,
      duration: '12 months',
      features: ['Complete syllabus coverage', 'Weekly tests', 'Doubt sessions', 'Study material'],
    },
    {
      id: 'physics-12',
      name: 'Physics Class 12',
      price: 18000,
      duration: '12 months',
      features: ['Complete syllabus coverage', 'Weekly tests', 'Doubt sessions', 'Study material', 'Board exam preparation'],
    },
    {
      id: 'maths-11',
      name: 'Mathematics Class 11',
      price: 15000,
      duration: '12 months',
      features: ['Complete syllabus coverage', 'Weekly tests', 'Doubt sessions', 'Study material'],
    },
    {
      id: 'maths-12',
      name: 'Mathematics Class 12',
      price: 18000,
      duration: '12 months',
      features: ['Complete syllabus coverage', 'Weekly tests', 'Doubt sessions', 'Study material', 'Board exam preparation'],
    },
    {
      id: 'jee-combo',
      name: 'JEE Preparation (Physics + Maths)',
      price: 35000,
      duration: '12 months',
      features: ['Complete JEE syllabus', 'Daily practice', 'Mock tests', 'Previous year papers', 'Personal mentoring'],
      popular: true,
    },
    {
      id: 'neet-physics',
      name: 'NEET Physics',
      price: 25000,
      duration: '12 months',
      features: ['NEET focused syllabus', 'MCQ practice', 'Mock tests', 'Previous year NEET papers'],
    },
  ];

  const paymentMethods = [
    { id: 'upi', name: 'UPI', icon: '📱', details: 'kirusil@upi' },
    { id: 'bank', name: 'Bank Transfer', icon: '🏦', details: 'Account details will be shared' },
    { id: 'cash', name: 'Cash Payment', icon: '💵', details: 'Pay at our center' },
  ];

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-blue-600 py-20">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <h1 className="text-4xl font-bold text-white md:text-5xl">Fee Payment</h1>
          <p className="mt-4 text-lg text-white/90">
            Simple and secure payment options for your courses
          </p>
        </div>
      </section>

      {/* Course Selection */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-2xl font-bold text-black dark:text-white">1. Select Your Course</h2>
          
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.id}
                onClick={() => setSelectedPlan(plan)}
                className={`relative cursor-pointer rounded-2xl border-2 p-6 transition-all ${
                  selectedPlan?.id === plan.id
                    ? 'border-blue-600 bg-blue-50 dark:bg-blue-950'
                    : 'border-zinc-200 bg-white hover:border-zinc-300 dark:border-zinc-700 dark:bg-zinc-900'
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-4 rounded-full bg-orange-500 px-3 py-1 text-xs font-semibold text-white">
                    Most Popular
                  </span>
                )}
                
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">{plan.name}</h3>
                <p className="mt-2 text-3xl font-bold text-zinc-900 dark:text-white">
                  ₹{plan.price.toLocaleString()}
                  <span className="text-sm font-normal text-zinc-500">/{plan.duration}</span>
                </p>
                
                <ul className="mt-4 space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm text-zinc-600 dark:text-zinc-400">
                      <svg className="mr-2 h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                {selectedPlan?.id === plan.id && (
                  <div className="mt-4 flex items-center text-blue-600 dark:text-blue-400">
                    <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Selected
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Payment Methods */}
      {selectedPlan && (
        <section className="bg-white py-16 dark:bg-zinc-900">
          <div className="mx-auto max-w-4xl px-6">
            <h2 className="text-2xl font-bold text-black dark:text-white">2. Choose Payment Method</h2>
            
            <div className="mt-8 rounded-2xl bg-zinc-50 p-6 dark:bg-zinc-800">
              <div className="flex items-center justify-between border-b border-zinc-200 pb-4 dark:border-zinc-700">
                <span className="text-zinc-600 dark:text-zinc-400">Selected Course:</span>
                <span className="font-semibold text-zinc-900 dark:text-white">{selectedPlan.name}</span>
              </div>
              <div className="flex items-center justify-between pt-4">
                <span className="text-zinc-600 dark:text-zinc-400">Total Amount:</span>
                <span className="text-2xl font-bold text-green-600">₹{selectedPlan.price.toLocaleString()}</span>
              </div>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {paymentMethods.map((method) => (
                <div
                  key={method.id}
                  className="rounded-2xl border-2 border-zinc-200 bg-white p-6 text-center dark:border-zinc-700 dark:bg-zinc-800"
                >
                  <div className="text-4xl">{method.icon}</div>
                  <h3 className="mt-2 font-semibold text-zinc-900 dark:text-white">{method.name}</h3>
                  <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{method.details}</p>
                </div>
              ))}
            </div>

            {/* UPI Payment Details */}
            <div className="mt-8 rounded-2xl bg-gradient-to-r from-blue-600 to-green-600 p-8 text-white">
              <h3 className="text-xl font-bold">Pay via UPI</h3>
              <div className="mt-4 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <div className="rounded-lg bg-white p-4">
                  <div className="h-32 w-32 bg-zinc-200 flex items-center justify-center text-zinc-500 text-xs">
                    QR Code
                  </div>
                </div>
                <div className="text-center sm:text-left">
                  <p className="text-white/80">Scan QR code or pay to:</p>
                  <p className="mt-2 text-2xl font-bold">kirusil@upi</p>
                  <p className="mt-4 text-white/80">Amount:</p>
                  <p className="text-3xl font-bold">₹{selectedPlan.price.toLocaleString()}</p>
                </div>
              </div>
            </div>

            {/* Instructions */}
            <div className="mt-8 rounded-2xl bg-yellow-50 p-6 dark:bg-yellow-950">
              <h3 className="font-semibold text-yellow-800 dark:text-yellow-200">📝 After Payment:</h3>
              <ol className="mt-2 list-inside list-decimal space-y-2 text-sm text-yellow-700 dark:text-yellow-300">
                <li>Take a screenshot of the payment confirmation</li>
                <li>Send the screenshot to our WhatsApp: +91 XXXXXXXXXX</li>
                <li>Include your name and selected course</li>
                <li>You will receive confirmation within 24 hours</li>
              </ol>
            </div>

            <div className="mt-8 text-center">
              <Link
                href="/contact"
                className="inline-block rounded-full bg-blue-600 px-8 py-3 text-lg font-semibold text-white transition-colors hover:bg-blue-700"
              >
                Need Help? Contact Us
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-2xl font-bold text-black dark:text-white">Frequently Asked Questions</h2>
          
          <div className="mt-8 space-y-4">
            <div className="rounded-lg bg-white p-6 dark:bg-zinc-900">
              <h3 className="font-semibold text-zinc-900 dark:text-white">Can I pay in installments?</h3>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                Yes, we offer installment options. Contact us to discuss a payment plan that works for you.
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 dark:bg-zinc-900">
              <h3 className="font-semibold text-zinc-900 dark:text-white">Is there a refund policy?</h3>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                Yes, full refund is available within 7 days of enrollment if you&apos;re not satisfied with the course.
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 dark:bg-zinc-900">
              <h3 className="font-semibold text-zinc-900 dark:text-white">Are there any discounts available?</h3>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                Yes! We offer sibling discounts and early bird discounts. Contact us to learn more.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
