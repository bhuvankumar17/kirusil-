export const metadata = {
  title: "Our Services",
  description: "Discover the educational services offered by Kurisil Academy - Physics and Mathematics tutoring, exam preparation, doubt clearing sessions, and personalized learning support.",
  keywords: ["tutoring services", "physics coaching", "maths coaching", "exam preparation services", "doubt clearing sessions", "educational services namakkal"],
  openGraph: {
    title: "Our Services | Kurisil Academy",
    description: "Discover the educational services offered by Kurisil Academy - Physics and Mathematics tutoring and exam preparation.",
    url: "https://kurisil.vercel.app/services",
  },
  alternates: {
    canonical: "https://kurisil.vercel.app/services",
  },
};

export default function Services() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <main className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-3xl font-semibold tracking-tight text-black dark:text-zinc-50">
          Our Services
        </h1>
        <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
          Explore the services we offer.
        </p>
      </main>
    </div>
  );
}
