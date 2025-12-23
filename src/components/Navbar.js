'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About Us' },
    { href: '/courses', label: 'Courses' },
    { href: '/daily-questions', label: 'Daily Questions' },
    { href: '/payment', label: 'Payment' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled
        ? 'bg-white/95 backdrop-blur-lg dark:bg-zinc-900/95 shadow-lg'
        : 'bg-white/90 backdrop-blur-lg dark:bg-zinc-900/90'
      } border-b border-zinc-200 dark:border-zinc-800`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0">
            <Image
              src="/logo.png"
              alt="Kurisil Logo"
              width={44}
              height={44}
              className="rounded-xl shadow-lg"
              priority
            />
            <div className="hidden sm:flex flex-col">
              <span className="text-lg font-bold bg-gradient-to-r from-lime-500 to-cyan-500 bg-clip-text text-transparent">Kurisil</span>
              <span className="text-[10px] font-medium text-zinc-500 dark:text-zinc-400 -mt-1">Academy</span>
            </div>
          </Link>

          {/* Desktop Navigation - Centered with more spacing */}
          <div className="hidden md:flex md:items-center md:justify-center md:flex-1 md:gap-1 lg:gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 lg:px-4 py-2 text-base font-medium rounded-lg transition-all duration-200 ${pathname === link.href
                    ? 'text-cyan-500 bg-cyan-50 dark:text-cyan-400 dark:bg-cyan-900/30'
                    : 'text-zinc-600 hover:text-cyan-500 hover:bg-cyan-50 dark:text-zinc-300 dark:hover:text-cyan-400 dark:hover:bg-zinc-800'
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Theme Toggle & Auth Buttons - Desktop */}
          <div className="hidden md:flex items-center gap-3 flex-shrink-0">
            <ThemeToggle />
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
                  className="px-4 py-2 text-sm font-medium text-zinc-600 hover:text-cyan-500 rounded-lg transition-colors dark:text-zinc-300"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 to-lime-500 rounded-lg shadow-md shadow-cyan-500/25 hover:shadow-lg hover:shadow-cyan-500/40 transition-all duration-200 hover:-translate-y-0.5"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              <div className="relative h-6 w-6">
                <span className={`absolute left-0 top-1 h-0.5 w-6 bg-current transition-all duration-300 ${isOpen ? 'rotate-45 top-3' : ''}`}></span>
                <span className={`absolute left-0 top-3 h-0.5 w-6 bg-current transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`}></span>
                <span className={`absolute left-0 top-5 h-0.5 w-6 bg-current transition-all duration-300 ${isOpen ? '-rotate-45 top-3' : ''}`}></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
          }`}>
          <div className="py-4 border-t border-zinc-200 dark:border-zinc-800">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block py-3 px-4 text-base font-medium rounded-lg transition-all duration-200 ${pathname === link.href
                    ? 'text-cyan-500 bg-cyan-50 dark:text-cyan-400 dark:bg-cyan-900/30'
                    : 'text-zinc-600 hover:text-cyan-500 hover:bg-zinc-50 dark:text-zinc-300 dark:hover:text-cyan-400 dark:hover:bg-zinc-800'
                  }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-4 pt-4 border-t border-zinc-200 dark:border-zinc-700">
              {session ? (
                <>
                  <div className="flex items-center gap-3 px-4 py-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg mb-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-cyan-500 to-lime-500 flex items-center justify-center text-white font-bold">
                      {session.user?.name?.charAt(0) || 'U'}
                    </div>
                    <div>
                      <p className="font-semibold text-zinc-900 dark:text-white">{session.user?.name}</p>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">{session.user?.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => { signOut(); setIsOpen(false); }}
                    className="w-full py-3 text-center text-base font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <div className="flex gap-3">
                  <Link
                    href="/login"
                    onClick={() => setIsOpen(false)}
                    className="flex-1 py-3 text-center text-base font-medium text-zinc-600 border border-zinc-300 rounded-lg hover:bg-zinc-50 dark:text-zinc-300 dark:border-zinc-600 dark:hover:bg-zinc-800 transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setIsOpen(false)}
                    className="flex-1 py-3 text-center text-base font-semibold text-white bg-gradient-to-r from-cyan-500 to-lime-500 rounded-lg hover:shadow-lg transition-all"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
