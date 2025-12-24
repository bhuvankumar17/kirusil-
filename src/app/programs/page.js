export const metadata = {
  title: "Our Programs",
  description: "Explore learning programs at Kurisil Academy - tailored programs for Class 11, Class 12, JEE, NEET, and competitive exam preparation in Physics and Mathematics.",
  keywords: ["learning programs", "JEE program", "NEET program", "class 11 program", "class 12 program", "physics program", "maths program"],
  openGraph: {
    title: "Our Programs | Kurisil Academy",
    description: "Explore learning programs at Kurisil Academy - tailored for Class 11, Class 12, JEE, and NEET preparation.",
    url: "https://kurisil.vercel.app/programs",
  },
  alternates: {
    canonical: "https://kurisil.vercel.app/programs",
  },
};

export default function Programs() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <main className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-3xl font-semibold tracking-tight text-black dark:text-zinc-50">
          Our Programs
        </h1>
        <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
          Discover our programs and offerings.
        </p>
      </main>
    </div>
  );
}
