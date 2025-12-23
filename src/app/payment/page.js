'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

export default function Payment() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentError, setPaymentError] = useState('');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login?callbackUrl=/payment');
    }
  }, [status, router]);

  // Show loading while checking auth
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-black">
        <div className="text-center">
          <svg className="mx-auto h-12 w-12 animate-spin text-blue-600" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="mt-4 text-zinc-600 dark:text-zinc-400">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect if not authenticated
  if (status === 'unauthenticated') {
    return null;
  }

  const plans = [
    {
      id: 'physics-11',
      name: 'Physics Class 11',
      price: 15000,
      priceUSD: 180,
      duration: '12 months',
      features: ['Complete syllabus coverage', 'Weekly tests', 'Doubt sessions', 'Study material'],
    },
    {
      id: 'physics-12',
      name: 'Physics Class 12',
      price: 18000,
      priceUSD: 216,
      duration: '12 months',
      features: ['Complete syllabus coverage', 'Weekly tests', 'Doubt sessions', 'Study material', 'Board exam preparation'],
    },
    {
      id: 'maths-11',
      name: 'Mathematics Class 11',
      price: 15000,
      priceUSD: 180,
      duration: '12 months',
      features: ['Complete syllabus coverage', 'Weekly tests', 'Doubt sessions', 'Study material'],
    },
    {
      id: 'maths-12',
      name: 'Mathematics Class 12',
      price: 18000,
      priceUSD: 216,
      duration: '12 months',
      features: ['Complete syllabus coverage', 'Weekly tests', 'Doubt sessions', 'Study material', 'Board exam preparation'],
    },
    {
      id: 'jee-combo',
      name: 'JEE Preparation (Physics + Maths)',
      price: 35000,
      priceUSD: 420,
      duration: '12 months',
      features: ['Complete JEE syllabus', 'Daily practice', 'Mock tests', 'Previous year papers', 'Personal mentoring'],
      popular: true,
    },
    {
      id: 'neet-physics',
      name: 'NEET Physics',
      price: 25000,
      priceUSD: 300,
      duration: '12 months',
      features: ['NEET focused syllabus', 'MCQ practice', 'Mock tests', 'Previous year NEET papers'],
    },
  ];

  const handlePaymentSuccess = (details) => {
    setPaymentSuccess(true);
    setPaymentError('');
    console.log('Payment completed:', details);
    // Here you can save the payment details to your database
  };

  const handlePaymentError = (error) => {
    setPaymentError('Payment failed. Please try again.');
    console.error('Payment error:', error);
  };

  // PayPal configuration
  const paypalOptions = {
    clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || 'test',
    currency: 'USD',
    intent: 'capture',
  };

  return (
    <PayPalScriptProvider options={paypalOptions}>
      <div className="min-h-screen bg-zinc-50 dark:bg-black">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-lime-500 to-cyan-500 py-20">
          <div className="mx-auto max-w-6xl px-6 text-center">
            <h1 className="text-4xl font-bold text-white md:text-5xl">Fee Payment</h1>
            <p className="mt-4 text-lg text-white/90">
              Simple and secure payment with PayPal
            </p>
            {session?.user && (
              <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 backdrop-blur-sm">
                <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-white font-medium">Welcome, {session.user.name}!</span>
              </div>
            )}
          </div>
        </section>

        {/* Payment Success Message */}
        {paymentSuccess && (
          <div className="mx-auto max-w-4xl px-6 pt-8">
            <div className="rounded-2xl bg-green-100 p-6 dark:bg-green-900/50">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500 text-white">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-green-800 dark:text-green-200">Payment Successful!</h3>
                  <p className="text-green-700 dark:text-green-300">
                    Thank you for your payment. You will receive a confirmation email shortly.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Payment Error Message */}
        {paymentError && (
          <div className="mx-auto max-w-4xl px-6 pt-8">
            <div className="rounded-2xl bg-red-100 p-6 dark:bg-red-900/50">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500 text-white">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-red-800 dark:text-red-200">Payment Failed</h3>
                  <p className="text-red-700 dark:text-red-300">{paymentError}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Course Selection */}
        <section className="py-16">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-2xl font-bold text-black dark:text-white">1. Select Your Course</h2>
            
            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  onClick={() => { setSelectedPlan(plan); setPaymentSuccess(false); setPaymentError(''); }}
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
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    ≈ ${plan.priceUSD} USD
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

        {/* Payment Section */}
        {selectedPlan && !paymentSuccess && (
          <section className="bg-white py-16 dark:bg-zinc-900">
            <div className="mx-auto max-w-4xl px-6">
              <h2 className="text-2xl font-bold text-black dark:text-white">2. Complete Payment</h2>
              
              {/* Order Summary */}
              <div className="mt-8 rounded-2xl bg-zinc-50 p-6 dark:bg-zinc-800">
                <h3 className="font-semibold text-zinc-900 dark:text-white">Order Summary</h3>
                <div className="mt-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-600 dark:text-zinc-400">Course:</span>
                    <span className="font-semibold text-zinc-900 dark:text-white">{selectedPlan.name}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-600 dark:text-zinc-400">Duration:</span>
                    <span className="text-zinc-900 dark:text-white">{selectedPlan.duration}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-600 dark:text-zinc-400">Student:</span>
                    <span className="text-zinc-900 dark:text-white">{session?.user?.name}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-600 dark:text-zinc-400">Email:</span>
                    <span className="text-zinc-900 dark:text-white">{session?.user?.email}</span>
                  </div>
                  <hr className="border-zinc-200 dark:border-zinc-700" />
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-600 dark:text-zinc-400">Price (INR):</span>
                    <span className="text-zinc-900 dark:text-white">₹{selectedPlan.price.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-lg">
                    <span className="font-semibold text-zinc-900 dark:text-white">Total (USD):</span>
                    <span className="text-2xl font-bold text-green-600">${selectedPlan.priceUSD}</span>
                  </div>
                </div>
              </div>

              {/* PayPal Button */}
              <div className="mt-8 rounded-2xl bg-white p-6 shadow-lg dark:bg-zinc-800">
                <div className="mb-6 flex items-center justify-center gap-3">
                  <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none">
                    <path d="M7.076 21.337H2.47a.641.641 0 01-.633-.74L4.944 3.72a.771.771 0 01.761-.654h6.399c2.077 0 3.725.591 4.665 1.677.893 1.032 1.171 2.455.826 4.235-.449 2.316-1.527 4.002-3.203 5.013-1.626.98-3.687 1.477-6.122 1.477H6.35a.772.772 0 00-.761.654l-.513 3.215z" fill="#003087"/>
                    <path d="M23.072 7.994c-.448 2.315-1.526 4.001-3.203 5.012-1.626.98-3.686 1.477-6.121 1.477h-1.919a.772.772 0 00-.762.654l-.845 5.366a.642.642 0 00.634.74h3.28a.771.771 0 00.761-.654l.314-1.987a.772.772 0 01.761-.654h.533c2.436 0 4.497-.497 6.122-1.477 1.677-1.011 2.755-2.697 3.203-5.013.345-1.78.067-3.203-.826-4.234-.412-.476-.924-.87-1.524-1.172.252.613.413 1.276.472 1.987l.12-.045z" fill="#0070E0"/>
                  </svg>
                  <span className="text-xl font-bold text-zinc-900 dark:text-white">Pay with PayPal</span>
                </div>
                
                <PayPalButtons
                  style={{ layout: 'vertical', color: 'blue', shape: 'rect', label: 'pay' }}
                  createOrder={(data, actions) => {
                    return actions.order.create({
                      purchase_units: [
                        {
                          description: selectedPlan.name,
                          amount: {
                            value: selectedPlan.priceUSD.toString(),
                            currency_code: 'USD',
                          },
                        },
                      ],
                      application_context: {
                        shipping_preference: 'NO_SHIPPING',
                      },
                    });
                  }}
                  onApprove={(data, actions) => {
                    return actions.order.capture().then((details) => {
                      handlePaymentSuccess(details);
                    });
                  }}
                  onError={(err) => {
                    handlePaymentError(err);
                  }}
                />

                <p className="mt-4 text-center text-sm text-zinc-500 dark:text-zinc-400">
                  Secure payment powered by PayPal. You can pay with your PayPal account or credit/debit card.
                </p>
              </div>

              {/* Alternative Payment */}
              <div className="mt-8 rounded-2xl border-2 border-dashed border-zinc-300 p-6 dark:border-zinc-700">
                <h3 className="font-semibold text-zinc-900 dark:text-white">Need an alternative payment method?</h3>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                  Contact us for bank transfer or other payment options.
                </p>
                <Link
                  href="/contact"
                  className="mt-4 inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 dark:text-blue-400"
                >
                  Contact Support
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
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
                <h3 className="font-semibold text-zinc-900 dark:text-white">Is PayPal payment secure?</h3>
                <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                  Yes, PayPal is one of the most secure payment methods. Your financial information is never shared with us.
                </p>
              </div>
              <div className="rounded-lg bg-white p-6 dark:bg-zinc-900">
                <h3 className="font-semibold text-zinc-900 dark:text-white">Can I pay without a PayPal account?</h3>
                <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                  Yes! PayPal allows you to pay with your credit or debit card without creating an account.
                </p>
              </div>
              <div className="rounded-lg bg-white p-6 dark:bg-zinc-900">
                <h3 className="font-semibold text-zinc-900 dark:text-white">Is there a refund policy?</h3>
                <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                  Yes, full refund is available within 7 days of enrollment if you&apos;re not satisfied with the course.
                </p>
              </div>
              <div className="rounded-lg bg-white p-6 dark:bg-zinc-900">
                <h3 className="font-semibold text-zinc-900 dark:text-white">Why is the price in USD?</h3>
                <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                  PayPal processes international payments in USD. The INR equivalent is shown for your reference.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PayPalScriptProvider>
  );
}
