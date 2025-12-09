import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "Kirusil Tuition Center | Expert Physics & Maths Tutoring",
    template: "%s | Kirusil Tuition Center",
  },
  description: "Kirusil Tuition Center offers expert tutoring in Physics and Mathematics for students of all levels. Personalized learning, experienced teachers, and proven results. Join us for academic excellence!",
  keywords: ["physics tuition", "maths tuition", "tuition center", "physics tutoring", "mathematics tutoring", "online tuition", "Kirusil", "exam preparation", "CBSE tuition", "ICSE tuition"],
  authors: [{ name: "Kirusil Tuition Center" }],
  creator: "Kirusil Tuition Center",
  publisher: "Kirusil Tuition Center",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://kirusil.vercel.app",
    siteName: "Kirusil Tuition Center",
    title: "Kirusil Tuition Center | Expert Physics & Maths Tutoring",
    description: "Expert tutoring in Physics and Mathematics. Personalized learning with experienced teachers for academic excellence.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Kirusil Tuition Center",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kirusil Tuition Center | Expert Physics & Maths Tutoring",
    description: "Expert tutoring in Physics and Mathematics. Join Kirusil for academic excellence!",
    images: ["/og-image.png"],
  },
  verification: {
    google: "your-google-verification-code", // Replace with actual code
  },
  alternates: {
    canonical: "https://kirusil.vercel.app",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XXXXXXXXXX');
            `,
          }}
        />
        {/* Local Business Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              "name": "Kirusil Tuition Center",
              "description": "Expert tutoring in Physics and Mathematics for students of all levels.",
              "url": "https://kirusil.vercel.app",
              "logo": "https://kirusil.vercel.app/logo.jpg",
              "sameAs": [
                "https://www.facebook.com/kirusil",
                "https://www.instagram.com/kirusil",
                "https://twitter.com/kirusil"
              ],
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Your Street Address",
                "addressLocality": "Your City",
                "addressRegion": "Your State",
                "postalCode": "Your Postal Code",
                "addressCountry": "IN"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+91-XXXXXXXXXX",
                "contactType": "customer service",
                "availableLanguage": ["English", "Tamil", "Hindi"]
              },
              "offers": {
                "@type": "Offer",
                "name": "Physics and Mathematics Tutoring",
                "description": "Personalized tutoring for Physics and Mathematics"
              }
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
