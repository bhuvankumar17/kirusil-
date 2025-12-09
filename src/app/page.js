import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-green-50 dark:from-zinc-950 dark:via-black dark:to-zinc-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-blue-200/50 blur-3xl dark:bg-blue-900/30"></div>
          <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-green-200/50 blur-3xl dark:bg-green-900/30"></div>
        </div>
        
        <div className="relative mx-auto max-w-6xl px-6 py-24 text-center lg:py-32">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700 dark:bg-blue-900/50 dark:text-blue-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500"></span>
            </span>
            New Batch Starting Soon!
          </div>
          
          <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Master{" "}
            <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              Physics
            </span>{" "}
            &{" "}
            <span className="bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
              Mathematics
            </span>
          </h1>
          
          <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400 md:text-xl">
            Expert tutoring to help you excel in Physics and Maths. From basic concepts to advanced problem-solving, we guide you every step of the way.
          </p>
          
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-blue-500/25 transition-all hover:shadow-xl hover:shadow-blue-500/30 hover:scale-105"
            >
              Get Started
              <svg className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/courses"
              className="flex items-center gap-2 rounded-full border-2 border-zinc-300 bg-white/50 px-8 py-4 text-lg font-semibold text-zinc-800 backdrop-blur-sm transition-all hover:border-zinc-400 hover:bg-white dark:border-zinc-600 dark:bg-zinc-800/50 dark:text-white dark:hover:border-zinc-500"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              View Courses
            </Link>
          </div>
          
          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-zinc-900 dark:text-white md:text-4xl">500+</div>
              <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Students Taught</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-zinc-900 dark:text-white md:text-4xl">95%</div>
              <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Pass Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-zinc-900 dark:text-white md:text-4xl">5+</div>
              <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-zinc-900 dark:text-white md:text-4xl">4.9⭐</div>
              <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Student Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">Why Choose Us</span>
            <h2 className="mt-2 text-3xl font-bold text-zinc-900 dark:text-white md:text-4xl">
              Everything You Need to Succeed
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-zinc-600 dark:text-zinc-400">
              We provide comprehensive support to help you achieve your academic goals
            </p>
          </div>
          
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {/* Feature 1 */}
            <div className="group rounded-3xl bg-white p-8 shadow-sm transition-all hover:shadow-xl dark:bg-zinc-900">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 text-2xl text-white shadow-lg shadow-blue-500/30">
                👨‍🏫
              </div>
              <h3 className="mt-6 text-xl font-bold text-zinc-900 dark:text-white">
                Expert Teachers
              </h3>
              <p className="mt-3 text-zinc-600 dark:text-zinc-400">
                Learn from experienced educators with proven track records in Physics and Mathematics.
              </p>
              <Link href="/about" className="mt-4 inline-flex items-center text-sm font-semibold text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400">
                Learn more
                <svg className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* Feature 2 */}
            <div className="group rounded-3xl bg-white p-8 shadow-sm transition-all hover:shadow-xl dark:bg-zinc-900">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 to-green-600 text-2xl text-white shadow-lg shadow-green-500/30">
                🎯
              </div>
              <h3 className="mt-6 text-xl font-bold text-zinc-900 dark:text-white">
                Personalized Learning
              </h3>
              <p className="mt-3 text-zinc-600 dark:text-zinc-400">
                Customized study plans tailored to your learning pace and academic goals.
              </p>
              <Link href="/courses" className="mt-4 inline-flex items-center text-sm font-semibold text-green-600 transition-colors hover:text-green-700 dark:text-green-400">
                View courses
                <svg className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* Feature 3 */}
            <div className="group rounded-3xl bg-white p-8 shadow-sm transition-all hover:shadow-xl dark:bg-zinc-900">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 text-2xl text-white shadow-lg shadow-purple-500/30">
                🏆
              </div>
              <h3 className="mt-6 text-xl font-bold text-zinc-900 dark:text-white">
                Proven Results
              </h3>
              <p className="mt-3 text-zinc-600 dark:text-zinc-400">
                Our students consistently achieve excellent grades and top exam scores.
              </p>
              <Link href="/about" className="mt-4 inline-flex items-center text-sm font-semibold text-purple-600 transition-colors hover:text-purple-700 dark:text-purple-400">
                See results
                <svg className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Subjects Section */}
      <section className="bg-zinc-100 py-20 dark:bg-zinc-900/50">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-green-600 dark:text-green-400">Our Expertise</span>
            <h2 className="mt-2 text-3xl font-bold text-zinc-900 dark:text-white md:text-4xl">
              Subjects We Teach
            </h2>
          </div>
          
          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            {/* Physics Card */}
            <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-500 to-blue-700 p-8 text-white shadow-xl">
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl"></div>
              <div className="relative">
                <div className="flex items-center gap-3">
                  <span className="text-4xl">⚛️</span>
                  <h3 className="text-2xl font-bold">Physics</h3>
                </div>
                <p className="mt-3 text-blue-100">
                  From classical mechanics to modern physics, master every concept with clarity.
                </p>
                <ul className="mt-6 grid grid-cols-2 gap-3">
                  {['Mechanics', 'Electromagnetism', 'Waves & Optics', 'Thermodynamics', 'Modern Physics', 'Quantum Basics'].map((topic) => (
                    <li key={topic} className="flex items-center gap-2 text-sm">
                      <svg className="h-4 w-4 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {topic}
                    </li>
                  ))}
                </ul>
                <Link href="/courses" className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/20 px-5 py-2 text-sm font-semibold backdrop-blur-sm transition-all hover:bg-white/30">
                  Explore Physics Courses
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Mathematics Card */}
            <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-green-500 to-green-700 p-8 text-white shadow-xl">
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl"></div>
              <div className="relative">
                <div className="flex items-center gap-3">
                  <span className="text-4xl">📐</span>
                  <h3 className="text-2xl font-bold">Mathematics</h3>
                </div>
                <p className="mt-3 text-green-100">
                  Build strong foundations from algebra to calculus with step-by-step guidance.
                </p>
                <ul className="mt-6 grid grid-cols-2 gap-3">
                  {['Algebra', 'Calculus', 'Trigonometry', 'Geometry', 'Statistics', 'Probability'].map((topic) => (
                    <li key={topic} className="flex items-center gap-2 text-sm">
                      <svg className="h-4 w-4 text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {topic}
                    </li>
                  ))}
                </ul>
                <Link href="/courses" className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/20 px-5 py-2 text-sm font-semibold backdrop-blur-sm transition-all hover:bg-white/30">
                  Explore Maths Courses
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Daily Questions Promo */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 p-1">
            <div className="rounded-[22px] bg-white p-8 dark:bg-zinc-900 md:p-12">
              <div className="flex flex-col items-center gap-8 md:flex-row">
                <div className="flex-1 text-center md:text-left">
                  <span className="inline-flex items-center gap-2 rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-700 dark:bg-purple-900/50 dark:text-purple-300">
                    ✨ Free Resource
                  </span>
                  <h2 className="mt-4 text-2xl font-bold text-zinc-900 dark:text-white md:text-3xl">
                    Daily Practice Questions
                  </h2>
                  <p className="mt-3 text-zinc-600 dark:text-zinc-400">
                    Sharpen your skills with new Physics and Mathematics questions every day. Track your progress and learn from detailed solutions.
                  </p>
                  <Link
                    href="/daily-questions"
                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-3 font-semibold text-white shadow-lg transition-all hover:shadow-xl hover:scale-105"
                  >
                    Try Today&apos;s Questions
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="rounded-2xl bg-zinc-100 p-4 dark:bg-zinc-800">
                    <div className="text-3xl font-bold text-purple-600">50+</div>
                    <div className="text-sm text-zinc-600 dark:text-zinc-400">Questions/Week</div>
                  </div>
                  <div className="rounded-2xl bg-zinc-100 p-4 dark:bg-zinc-800">
                    <div className="text-3xl font-bold text-blue-600">100%</div>
                    <div className="text-sm text-zinc-600 dark:text-zinc-400">Free Access</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-zinc-100 py-20 dark:bg-zinc-900/50">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">Testimonials</span>
            <h2 className="mt-2 text-3xl font-bold text-zinc-900 dark:text-white md:text-4xl">
              What Our Students Say
            </h2>
          </div>
          
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { name: 'Rahul S.', class: 'Class 12', text: 'My Physics marks improved from 60 to 92 in just 3 months! The teaching style is amazing.', rating: 5 },
              { name: 'Priya M.', class: 'Class 11', text: 'Maths used to be my nightmare. Now it\'s my favorite subject thanks to Kirusil Tuition!', rating: 5 },
              { name: 'Arjun K.', class: 'JEE Aspirant', text: 'Best coaching for JEE preparation. The doubt sessions are really helpful.', rating: 5 },
            ].map((testimonial, index) => (
              <div key={index} className="rounded-2xl bg-white p-6 shadow-sm dark:bg-zinc-800">
                <div className="flex items-center gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400">⭐</span>
                  ))}
                </div>
                <p className="mt-4 text-zinc-600 dark:text-zinc-300">&ldquo;{testimonial.text}&rdquo;</p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-green-500 font-bold text-white">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-zinc-900 dark:text-white">{testimonial.name}</div>
                    <div className="text-sm text-zinc-500">{testimonial.class}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-green-600"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"30\" height=\"30\" viewBox=\"0 0 30 30\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cpath d=\"M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z\" fill=\"rgba(255,255,255,0.07)\"%2F%3E%3C%2Fsvg%3E')] opacity-50"></div>
        
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            Ready to Excel in Physics & Maths?
          </h2>
          <p className="mt-4 text-lg text-white/90">
            Join thousands of students who have transformed their academic journey with us.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="flex items-center gap-2 rounded-full bg-white px-8 py-4 text-lg font-semibold text-blue-600 shadow-xl transition-all hover:scale-105"
            >
              Enroll Now
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <a
              href="tel:+911234567890"
              className="flex items-center gap-2 rounded-full border-2 border-white/30 px-8 py-4 text-lg font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
