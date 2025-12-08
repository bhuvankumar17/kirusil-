import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-white dark:from-black dark:to-zinc-900">
      {/* Hero Section */}
      <section className="mx-auto max-w-6xl px-6 py-20 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-black dark:text-white sm:text-5xl md:text-6xl">
          Master <span className="text-blue-600">Physics</span> &{" "}
          <span className="text-green-600">Mathematics</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
          Expert tutoring to help you excel in Physics and Maths. From basic concepts to advanced problem-solving, we guide you every step of the way.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/contact"
            className="rounded-full bg-blue-600 px-8 py-3 text-lg font-semibold text-white transition-colors hover:bg-blue-700"
          >
            Get Started
          </Link>
          <Link
            href="/programs"
            className="rounded-full border-2 border-zinc-300 px-8 py-3 text-lg font-semibold text-zinc-800 transition-colors hover:border-zinc-400 dark:border-zinc-600 dark:text-white dark:hover:border-zinc-500"
          >
            View Programs
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20 dark:bg-zinc-900">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-center text-3xl font-bold text-black dark:text-white">
            Why Choose Us?
          </h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {/* Feature 1 */}
            <div className="rounded-2xl bg-zinc-50 p-8 dark:bg-zinc-800">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-2xl dark:bg-blue-900">
                📚
              </div>
              <h3 className="mt-4 text-xl font-semibold text-black dark:text-white">
                Expert Teachers
              </h3>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                Learn from experienced educators with proven track records in Physics and Mathematics.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="rounded-2xl bg-zinc-50 p-8 dark:bg-zinc-800">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-2xl dark:bg-green-900">
                🎯
              </div>
              <h3 className="mt-4 text-xl font-semibold text-black dark:text-white">
                Personalized Learning
              </h3>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                Customized study plans tailored to your learning pace and goals.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="rounded-2xl bg-zinc-50 p-8 dark:bg-zinc-800">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 text-2xl dark:bg-purple-900">
                🏆
              </div>
              <h3 className="mt-4 text-xl font-semibold text-black dark:text-white">
                Proven Results
              </h3>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                Our students consistently achieve excellent grades and top exam scores.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Subjects Section */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-center text-3xl font-bold text-black dark:text-white">
            Our Subjects
          </h2>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {/* Physics */}
            <div className="rounded-2xl border-2 border-blue-200 bg-blue-50 p-8 dark:border-blue-800 dark:bg-blue-950">
              <h3 className="text-2xl font-bold text-blue-700 dark:text-blue-400">
                ⚛️ Physics
              </h3>
              <ul className="mt-4 space-y-2 text-zinc-700 dark:text-zinc-300">
                <li>• Mechanics & Motion</li>
                <li>• Electricity & Magnetism</li>
                <li>• Waves & Optics</li>
                <li>• Thermodynamics</li>
                <li>• Modern Physics</li>
              </ul>
            </div>

            {/* Mathematics */}
            <div className="rounded-2xl border-2 border-green-200 bg-green-50 p-8 dark:border-green-800 dark:bg-green-950">
              <h3 className="text-2xl font-bold text-green-700 dark:text-green-400">
                📐 Mathematics
              </h3>
              <ul className="mt-4 space-y-2 text-zinc-700 dark:text-zinc-300">
                <li>• Algebra & Equations</li>
                <li>• Calculus</li>
                <li>• Trigonometry</li>
                <li>• Geometry</li>
                <li>• Statistics & Probability</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-green-600 py-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl font-bold text-white">
            Ready to Excel in Physics & Maths?
          </h2>
          <p className="mt-4 text-lg text-white/90">
            Join our tuition classes and unlock your full potential today!
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-block rounded-full bg-white px-8 py-3 text-lg font-semibold text-blue-600 transition-colors hover:bg-zinc-100"
          >
            Contact Us Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-zinc-900 py-8 text-center text-zinc-400">
        <p>© 2024 Kirusil Tuition. All rights reserved.</p>
      </footer>
    </div>
  );
}
