'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';

export default function Navbar() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About Us' },
    { href: '/courses', label: 'Courses' },
    { href: '/daily-questions', label: 'Daily Questions' },
    { href: '/payment', label: 'Payment' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg dark:bg-zinc-900/90 border-b border-zinc-200 dark:border-zinc-800 shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0">
            <Image
              src="/logo.png"
              alt="Kirusil Logo"
              width={44}
              height={44}
              className="rounded-xl shadow-lg"
              priority
            />
            <div className="hidden sm:flex flex-col">
              <span className="text-lg font-bold bg-gradient-to-r from-lime-500 to-blue-600 bg-clip-text text-transparent">Kirusil</span>
              <span className="text-[10px] font-medium text-zinc-500 dark:text-zinc-400 -mt-1">Tuition Center</span>
            </div>
          </Link>

          {/* Desktop Navigation - Centered with more spacing */}
          <div className="hidden md:flex md:items-center md:justify-center md:flex-1 md:gap-1 lg:gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 lg:px-4 py-2 text-base font-medium text-zinc-600 rounded-lg transition-all duration-200 hover:text-blue-600 hover:bg-blue-50 dark:text-zinc-300 dark:hover:text-blue-400 dark:hover:bg-zinc-800"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Auth Buttons - Desktop */}
          <div className="hidden md:flex items-center gap-3 flex-shrink-0">
            {session ? (
              <>
                <span className="text-sm text-zinc-600 dark:text-zinc-400">
                  Hi, <span className="font-semibold text-zinc-900 dark:text-white">{session.user?.name?.split(' ')[0]}</span>
                </span>
                <button
                  onClick={() => signOut()}
                  className="px-4 py-2 text-sm font-medium text-zinc-600 hover:text-red-600 rounded-lg transition-colors"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm font-medium text-zinc-600 hover:text-blue-600 rounded-lg transition-colors dark:text-zinc-300"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow-md shadow-blue-500/25 hover:shadow-lg hover:shadow-blue-500/40 transition-all duration-200 hover:-translate-y-0.5"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
          >
            {isOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-zinc-200 dark:border-zinc-800">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block py-2 text-sm font-medium text-zinc-600 transition-colors hover:text-blue-600 dark:text-zinc-300 dark:hover:text-blue-400"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-4 pt-4 border-t border-zinc-200 dark:border-zinc-700">
              {session ? (
                <>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-2">
                    Signed in as <span className="font-semibold text-zinc-900 dark:text-white">{session.user?.name}</span>
                  </p>
                  <button
                    onClick={() => { signOut(); setIsOpen(false); }}
                    className="w-full text-left py-2 text-sm font-medium text-red-600 hover:text-red-700"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <div className="flex gap-3">
                  <Link
                    href="/login"
                    onClick={() => setIsOpen(false)}
                    className="flex-1 py-2 text-center text-sm font-medium text-zinc-600 border border-zinc-300 rounded-lg hover:bg-zinc-50 dark:text-zinc-300 dark:border-zinc-600"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setIsOpen(false)}
                    className="flex-1 py-2 text-center text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
