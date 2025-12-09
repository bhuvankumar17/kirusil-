'use client';

import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setStatus({ type: 'success', message: 'Message sent successfully! We will get back to you soon.' });
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        setStatus({ type: 'error', message: data.error || 'Something went wrong' });
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'Failed to send message' });
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: 'Visit Us',
      details: ['123 Education Street', 'Your City, State 12345'],
      color: 'blue',
    },
    {
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      title: 'Call Us',
      details: ['+91 12345 67890', '+91 98765 43210'],
      color: 'green',
    },
    {
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: 'Email Us',
      details: ['info@kirusil.com', 'support@kirusil.com'],
      color: 'purple',
    },
    {
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Working Hours',
      details: ['Mon - Sat: 9AM - 8PM', 'Sunday: 10AM - 2PM'],
      color: 'orange',
    },
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400',
      green: 'bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-400',
      purple: 'bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-400',
      orange: 'bg-orange-100 text-orange-600 dark:bg-orange-900/50 dark:text-orange-400',
    };
    return colors[color];
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-green-50 dark:from-zinc-950 dark:via-black dark:to-zinc-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-green-600 py-20">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"30\" height=\"30\" viewBox=\"0 0 30 30\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cpath d=\"M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z\" fill=\"rgba(255,255,255,0.07)\"%2F%3E%3C%2Fsvg%3E')] opacity-50"></div>
        <div className="relative mx-auto max-w-6xl px-6 text-center">
          <h1 className="text-4xl font-bold text-white md:text-5xl">Get in Touch</h1>
          <p className="mt-4 text-lg text-white/90">
            Have questions? We&apos;d love to hear from you. Send us a message!
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {contactInfo.map((item, index) => (
              <div
                key={index}
                className="group rounded-2xl bg-white p-6 shadow-sm transition-all hover:shadow-lg dark:bg-zinc-900"
              >
                <div className={`inline-flex rounded-xl p-3 ${getColorClasses(item.color)}`}>
                  {item.icon}
                </div>
                <h3 className="mt-4 font-semibold text-zinc-900 dark:text-white">{item.title}</h3>
                {item.details.map((detail, i) => (
                  <p key={i} className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                    {detail}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="pb-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Form */}
            <div className="rounded-3xl bg-white p-8 shadow-sm dark:bg-zinc-900">
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">Send us a Message</h2>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                Fill out the form below and we&apos;ll get back to you as soon as possible.
              </p>

              {status.message && (
                <div
                  className={`mt-6 flex items-center gap-3 rounded-xl p-4 ${
                    status.type === 'success'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300'
                      : 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300'
                  }`}
                >
                  {status.type === 'success' ? (
                    <svg className="h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  )}
                  {status.message}
                </div>
              )}

              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="John Doe"
                      className="mt-2 block w-full rounded-xl border-0 bg-zinc-100 px-4 py-3 text-zinc-900 placeholder-zinc-500 focus:bg-white focus:ring-2 focus:ring-blue-500 dark:bg-zinc-800 dark:text-white dark:placeholder-zinc-400 dark:focus:bg-zinc-700"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="john@example.com"
                      className="mt-2 block w-full rounded-xl border-0 bg-zinc-100 px-4 py-3 text-zinc-900 placeholder-zinc-500 focus:bg-white focus:ring-2 focus:ring-blue-500 dark:bg-zinc-800 dark:text-white dark:placeholder-zinc-400 dark:focus:bg-zinc-700"
                    />
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 12345 67890"
                      className="mt-2 block w-full rounded-xl border-0 bg-zinc-100 px-4 py-3 text-zinc-900 placeholder-zinc-500 focus:bg-white focus:ring-2 focus:ring-blue-500 dark:bg-zinc-800 dark:text-white dark:placeholder-zinc-400 dark:focus:bg-zinc-700"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                      Subject
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="mt-2 block w-full rounded-xl border-0 bg-zinc-100 px-4 py-3 text-zinc-900 focus:bg-white focus:ring-2 focus:ring-blue-500 dark:bg-zinc-800 dark:text-white dark:focus:bg-zinc-700"
                    >
                      <option value="">Select a subject</option>
                      <option value="admission">Admission Inquiry</option>
                      <option value="course">Course Information</option>
                      <option value="fees">Fee Structure</option>
                      <option value="demo">Demo Class Request</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    Your Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Tell us what you're looking for..."
                    className="mt-2 block w-full rounded-xl border-0 bg-zinc-100 px-4 py-3 text-zinc-900 placeholder-zinc-500 focus:bg-white focus:ring-2 focus:ring-blue-500 dark:bg-zinc-800 dark:text-white dark:placeholder-zinc-400 dark:focus:bg-zinc-700"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-green-600 px-6 py-4 font-semibold text-white shadow-lg transition-all hover:shadow-xl hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <svg className="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Map & Additional Info */}
            <div className="space-y-6">
              {/* Map Placeholder */}
              <div className="overflow-hidden rounded-3xl bg-zinc-200 dark:bg-zinc-800">
                <div className="aspect-video flex items-center justify-center bg-gradient-to-br from-blue-100 to-green-100 dark:from-blue-900/30 dark:to-green-900/30">
                  <div className="text-center">
                    <svg className="mx-auto h-16 w-16 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <p className="mt-2 text-zinc-500 dark:text-zinc-400">Map Location</p>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="rounded-3xl bg-white p-6 shadow-sm dark:bg-zinc-900">
                <h3 className="font-semibold text-zinc-900 dark:text-white">Quick Actions</h3>
                <div className="mt-4 space-y-3">
                  <a
                    href="tel:+911234567890"
                    className="flex items-center gap-3 rounded-xl bg-green-50 p-4 text-green-700 transition-colors hover:bg-green-100 dark:bg-green-900/30 dark:text-green-400 dark:hover:bg-green-900/50"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span className="font-medium">Call Now: +91 12345 67890</span>
                  </a>
                  <a
                    href="https://wa.me/911234567890"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-xl bg-emerald-50 p-4 text-emerald-700 transition-colors hover:bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400 dark:hover:bg-emerald-900/50"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    <span className="font-medium">WhatsApp Us</span>
                  </a>
                  <a
                    href="mailto:info@kirusil.com"
                    className="flex items-center gap-3 rounded-xl bg-blue-50 p-4 text-blue-700 transition-colors hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="font-medium">Email: info@kirusil.com</span>
                  </a>
                </div>
              </div>

              {/* FAQ Teaser */}
              <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-green-600 p-6 text-white">
                <h3 className="font-semibold">Have Questions?</h3>
                <p className="mt-2 text-sm text-white/80">
                  Check out our frequently asked questions or reach out to us directly.
                </p>
                <a
                  href="/about"
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-medium backdrop-blur-sm transition-colors hover:bg-white/30"
                >
                  Learn More About Us
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
