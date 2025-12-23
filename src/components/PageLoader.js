'use client';

import { useEffect, useState } from 'react';

export default function PageLoader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate page load
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white dark:bg-zinc-950">
      <div className="flex flex-col items-center gap-4">
        {/* Animated Logo */}
        <div className="relative">
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-zinc-200 border-t-cyan-500 dark:border-zinc-700 dark:border-t-cyan-400"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-cyan-500 to-lime-500 bg-clip-text text-transparent">
              K?
            </span>
          </div>
        </div>
        <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 animate-pulse">
          Loading...
        </p>
      </div>
    </div>
  );
}
