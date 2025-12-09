import Link from "next/link";

export default function Courses() {
  const courses = [
    {
      id: 1,
      title: "Physics - Class 11",
      description: "Complete physics course covering Mechanics, Thermodynamics, Waves, and Optics",
      topics: ["Kinematics", "Laws of Motion", "Work & Energy", "Rotational Motion", "Gravitation", "Thermodynamics"],
      duration: "12 months",
      price: "₹15,000/year",
      color: "blue",
    },
    {
      id: 2,
      title: "Physics - Class 12",
      description: "Advanced physics covering Electrostatics, Magnetism, Optics, and Modern Physics",
      topics: ["Electrostatics", "Current Electricity", "Magnetism", "EMI", "Optics", "Modern Physics"],
      duration: "12 months",
      price: "₹18,000/year",
      color: "blue",
    },
    {
      id: 3,
      title: "Mathematics - Class 11",
      description: "Foundation course in Algebra, Trigonometry, Coordinate Geometry, and Calculus",
      topics: ["Sets & Functions", "Trigonometry", "Complex Numbers", "Sequences", "Straight Lines", "Conic Sections"],
      duration: "12 months",
      price: "₹15,000/year",
      color: "green",
    },
    {
      id: 4,
      title: "Mathematics - Class 12",
      description: "Advanced mathematics including Calculus, Vectors, 3D Geometry, and Probability",
      topics: ["Relations & Functions", "Calculus", "Vectors", "3D Geometry", "Probability", "Linear Programming"],
      duration: "12 months",
      price: "₹18,000/year",
      color: "green",
    },
    {
      id: 5,
      title: "JEE Mains Preparation",
      description: "Comprehensive preparation for JEE Mains covering Physics and Mathematics",
      topics: ["Complete Physics", "Complete Mathematics", "Previous Year Papers", "Mock Tests", "Doubt Sessions"],
      duration: "12 months",
      price: "₹35,000/year",
      color: "purple",
    },
    {
      id: 6,
      title: "NEET Physics",
      description: "Physics preparation specifically designed for NEET aspirants",
      topics: ["Mechanics", "Heat & Thermodynamics", "Optics", "Electrodynamics", "Modern Physics", "Mock Tests"],
      duration: "12 months",
      price: "₹25,000/year",
      color: "orange",
    },
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: "border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950",
      green: "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950",
      purple: "border-purple-200 bg-purple-50 dark:border-purple-800 dark:bg-purple-950",
      orange: "border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950",
    };
    return colors[color] || colors.blue;
  };

  const getTitleColor = (color) => {
    const colors = {
      blue: "text-blue-700 dark:text-blue-400",
      green: "text-green-700 dark:text-green-400",
      purple: "text-purple-700 dark:text-purple-400",
      orange: "text-orange-700 dark:text-orange-400",
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-green-600 py-20">
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
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <div
                key={course.id}
                className={`rounded-2xl border-2 p-6 transition-transform hover:scale-105 ${getColorClasses(course.color)}`}
              >
                <h3 className={`text-xl font-bold ${getTitleColor(course.color)}`}>
                  {course.title}
                </h3>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                  {course.description}
                </p>
                
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

                <div className="mt-6 flex items-center justify-between border-t border-zinc-200 pt-4 dark:border-zinc-700">
                  <div>
                    <p className="text-xs text-zinc-500">Duration</p>
                    <p className="font-semibold text-zinc-800 dark:text-zinc-200">{course.duration}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-zinc-500">Fee</p>
                    <p className="font-bold text-zinc-800 dark:text-zinc-200">{course.price}</p>
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
            className="mt-8 inline-block rounded-full bg-blue-600 px-8 py-3 text-lg font-semibold text-white transition-colors hover:bg-blue-700"
          >
            Get Free Counseling
          </Link>
        </div>
      </section>
    </div>
  );
}
