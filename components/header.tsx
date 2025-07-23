'use client';

import Link from 'next/link';
import Search from './search';

export default function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center">
                <span className="text-white font-bold text-sm">TC</span>
              </div>
              <span className="font-semibold text-gray-900 text-lg">TC Docs</span>
            </Link>
          </div>
          
          {/* Search */}
          <div className="flex-1 max-w-lg mx-8">
            <Search 
              placeholder="Search documentation..." 
              variant="compact"
              className="w-full"
            />
          </div>
        </div>
      </div>
    </header>
  );
}