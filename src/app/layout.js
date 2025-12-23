import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthProvider from "@/components/AuthProvider";
import BackToTop from "@/components/BackToTop";
import WhatsAppButton from "@/components/WhatsAppButton";

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
    default: "Kurisil Academy | Physics & Maths Tutoring",
    template: "%s | Kurisil Academy",
  },
  description: "Kurisil Academy offers quality tutoring in Physics and Mathematics for students of all levels. Personalized learning, experienced teachers, and proven results. Join us for academic excellence!",
  keywords: ["physics tuition", "maths tuition", "academy", "physics tutoring", "mathematics tutoring", "online tuition", "Kurisil", "exam preparation", "CBSE tuition", "ICSE tuition"],
  authors: [{ name: "Kurisil Academy" }],
  creator: "Kurisil Academy",
  publisher: "Kurisil Academy",
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
    url: "https://kurisil.vercel.app",
    siteName: "Kurisil Academy",
    title: "Kurisil Academy | Physics & Maths Tutoring",
    description: "Quality tutoring in Physics and Mathematics. Personalized learning with experienced teachers for academic excellence.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Kurisil Academy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kurisil Academy | Physics & Maths Tutoring",
    description: "Quality tutoring in Physics and Mathematics. Join Kurisil for academic excellence!",
    images: ["/og-image.png"],
  },
  verification: {
    google: "your-google-verification-code", // Replace with actual code
  },
  alternates: {
    canonical: "https://kurisil.vercel.app",
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
              "name": "Kirusil Academy",
              "description": "Quality tutoring in Physics and Mathematics for students of all levels.",
              "url": "https://kirusil.vercel.app",
              "logo": "https://kirusil.vercel.app/logo.jpg",
              "sameAs": [
                "https://www.facebook.com/kirusil",
                "https://www.instagram.com/kirusil",
                "https://twitter.com/kirusil"
              ],
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "3/38 Mettu Street, Pachal (P.O)",
                "addressLocality": "Namakkal",
                "addressRegion": "Tamil Nadu",
                "postalCode": "637018",
                "addressCountry": "IN"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+91-9159129187",
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
        <AuthProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <BackToTop />
          <WhatsAppButton />
        </AuthProvider>
      </body>
    </html>
  );
}
