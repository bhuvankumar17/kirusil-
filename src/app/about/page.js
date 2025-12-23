import Link from "next/link";

export default function About() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-cyan-500 to-lime-500 py-20">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <h1 className="text-4xl font-bold text-white md:text-5xl">About Kurisil Academy</h1>
          <p className="mt-4 text-lg text-white/90">
            Empowering students to excel in Physics and Mathematics since 2020
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-3xl font-bold text-black dark:text-white">Our Story</h2>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
            Kurisil Academy was founded with a simple mission: to make Physics and Mathematics
            accessible and enjoyable for every student. We believe that with the right guidance
            and support, any student can master these subjects and achieve academic excellence.
          </p>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
            Our experienced team of educators is passionate about teaching and committed to
            helping students build strong foundations in science and mathematics. We use
            innovative teaching methods and personalized attention to ensure each student
            reaches their full potential.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-white py-16 dark:bg-zinc-900">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-2xl bg-cyan-50 p-8 dark:bg-cyan-950">
              <h3 className="text-2xl font-bold text-cyan-700 dark:text-cyan-400">🎯 Our Mission</h3>
              <p className="mt-4 text-zinc-700 dark:text-zinc-300">
                To provide quality education in Physics and Mathematics that empowers students
                to think critically, solve problems confidently, and achieve their academic goals.
              </p>
            </div>
            <div className="rounded-2xl bg-lime-50 p-8 dark:bg-lime-950">
              <h3 className="text-2xl font-bold text-lime-700 dark:text-lime-400">🌟 Our Vision</h3>
              <p className="mt-4 text-zinc-700 dark:text-zinc-300">
                To be the leading academy known for producing students who excel in
                competitive exams and develop a lifelong love for learning.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-center text-3xl font-bold text-black dark:text-white">
            Why Students Choose Us
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-3xl dark:bg-blue-900">
                👨‍🏫
              </div>
              <h3 className="mt-4 font-semibold text-black dark:text-white">Qualified Faculty</h3>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                Highly qualified teachers with years of experience
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl dark:bg-green-900">
                📊
              </div>
              <h3 className="mt-4 font-semibold text-black dark:text-white">Small Batches</h3>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                Personal attention with limited students per batch
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 text-3xl dark:bg-purple-900">
                📝
              </div>
              <h3 className="mt-4 font-semibold text-black dark:text-white">Regular Tests</h3>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                Weekly assessments to track progress
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 text-3xl dark:bg-orange-900">
                🏆
              </div>
              <h3 className="mt-4 font-semibold text-black dark:text-white">Proven Results</h3>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                Consistent track record of excellent results
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-zinc-900 py-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl font-bold text-white">Ready to Join Us?</h2>
          <p className="mt-4 text-zinc-400">
            Take the first step towards academic excellence today.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-block rounded-full bg-cyan-500 px-8 py-3 text-lg font-semibold text-white transition-colors hover:bg-cyan-600"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}
