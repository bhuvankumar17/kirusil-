import Link from "next/link";
import dbConnect from "@/lib/mongodb";
import Course from "@/models/Course";

export const metadata = {
  title: "Our Courses",
  description: "Explore comprehensive Physics and Mathematics courses at Kurisil Academy. Classes for 11th, 12th, JEE, and NEET preparation. Quality education with experienced faculty in Namakkal.",
  keywords: ["physics courses namakkal", "maths tuition", "JEE preparation", "NEET physics", "class 11 physics", "class 12 maths", "competitive exam coaching"],
  openGraph: {
    title: "Our Courses | Kurisil Academy",
    description: "Explore comprehensive Physics and Mathematics courses at Kurisil Academy. Classes for 11th, 12th, JEE, and NEET preparation.",
    url: "https://kurisil.vercel.app/courses",
  },
  alternates: {
    canonical: "https://kurisil.vercel.app/courses",
  },
};

// Fetch courses from database
async function getCourses() {
  try {
    await dbConnect();
    const courses = await Course.find({ isActive: true }).sort({ order: 1, createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(courses));
  } catch (error) {
    console.error('Error fetching courses:', error);
    return [];
  }
}

export default async function Courses() {
  const courses = await getCourses();

  const getColorClasses = (color) => {
    const colors = {
      blue: "border-cyan-200 bg-cyan-50 dark:border-cyan-800 dark:bg-cyan-950",
      green: "border-lime-200 bg-lime-50 dark:border-lime-800 dark:bg-lime-950",
      purple: "border-purple-200 bg-purple-50 dark:border-purple-800 dark:bg-purple-950",
      orange: "border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950",
      cyan: "border-cyan-200 bg-cyan-50 dark:border-cyan-800 dark:bg-cyan-950",
      lime: "border-lime-200 bg-lime-50 dark:border-lime-800 dark:bg-lime-950",
    };
    return colors[color] || colors.blue;
  };

  const getTitleColor = (color) => {
    const colors = {
      blue: "text-cyan-700 dark:text-cyan-400",
      green: "text-lime-700 dark:text-lime-400",
      purple: "text-purple-700 dark:text-purple-400",
      orange: "text-orange-700 dark:text-orange-400",
      cyan: "text-cyan-700 dark:text-cyan-400",
      lime: "text-lime-700 dark:text-lime-400",
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-cyan-500 to-lime-500 py-20">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <h1 className="text-4xl font-bold text-white md:text-5xl">Our Courses</h1>
          <p className="mt-4 text-lg text-white/90">
            Choose from our comprehensive range of Physics and Mathematics courses
          </p>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-6">
          {courses.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-zinc-600 dark:text-zinc-400">No courses available at the moment. Please check back later!</p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {courses.map((course) => (
                <div
                  key={course._id}
                  className={`relative rounded-2xl border-2 p-6 transition-transform hover:scale-105 ${getColorClasses(course.color)}`}
                >
                  {course.isPopular && (
                    <span className="absolute -top-3 left-4 rounded-full bg-orange-500 px-3 py-1 text-xs font-semibold text-white">
                      Most Popular
                    </span>
                  )}
                  <h3 className={`text-xl font-bold ${getTitleColor(course.color)}`}>
                    {course.title}
                  </h3>
                  <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                    {course.description}
                  </p>

                  {course.topics && course.topics.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">Topics Covered:</h4>
                      <ul className="mt-2 space-y-1">
                        {course.topics.slice(0, 4).map((topic, index) => (
                          <li key={index} className="text-sm text-zinc-600 dark:text-zinc-400">
                            • {topic}
                          </li>
                        ))}
                        {course.topics.length > 4 && (
                          <li className="text-sm text-zinc-500 dark:text-zinc-500">
                            + {course.topics.length - 4} more topics
                          </li>
                        )}
                      </ul>
                    </div>
                  )}

                  <div className="mt-6 flex items-center justify-between border-t border-zinc-200 pt-4 dark:border-zinc-700">
                    <div>
                      <p className="text-xs text-zinc-500">Duration</p>
                      <p className="font-semibold text-zinc-800 dark:text-zinc-200">{course.duration}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-zinc-500">Fee</p>
                      <p className="font-bold text-zinc-800 dark:text-zinc-200">₹{course.price?.toLocaleString()}/year</p>
                    </div>
                  </div>

                  <Link
                    href="/contact"
                    className="mt-4 block w-full rounded-full bg-zinc-900 py-2 text-center text-sm font-semibold text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
                  >
                    Enroll Now
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-16 dark:bg-zinc-900">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-center text-3xl font-bold text-black dark:text-white">
            What&apos;s Included
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-4">
            <div className="text-center">
              <div className="text-4xl">📚</div>
              <h3 className="mt-2 font-semibold text-black dark:text-white">Study Material</h3>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Comprehensive notes & worksheets</p>
            </div>
            <div className="text-center">
              <div className="text-4xl">📝</div>
              <h3 className="mt-2 font-semibold text-black dark:text-white">Weekly Tests</h3>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Regular assessments & feedback</p>
            </div>
            <div className="text-center">
              <div className="text-4xl">❓</div>
              <h3 className="mt-2 font-semibold text-black dark:text-white">Doubt Sessions</h3>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Unlimited doubt clearing</p>
            </div>
            <div className="text-center">
              <div className="text-4xl">📊</div>
              <h3 className="mt-2 font-semibold text-black dark:text-white">Progress Reports</h3>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Monthly performance analysis</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-zinc-900 py-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl font-bold text-white">Not Sure Which Course to Choose?</h2>
          <p className="mt-4 text-zinc-400">
            Contact us for a free counseling session to find the perfect course for you.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-block rounded-full bg-cyan-500 px-8 py-3 text-lg font-semibold text-white transition-colors hover:bg-cyan-600"
          >
            Get Free Counseling
          </Link>
        </div>
      </section>
    </div>
  );
}
