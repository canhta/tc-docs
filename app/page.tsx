import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import Search from '../components/search';

export default function Home() {
  // Get documentation count
  const docsDirectory = path.join(process.cwd(), 'app/docs');
  const docFiles = fs.readdirSync(docsDirectory).filter(name => name.endsWith('.md'));
  const docCount = docFiles.length;
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <header className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            TC Documentation
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-8">
            Documentation for the TC music education platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/docs"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              Browse Documentation
            </Link>
            <Link
              href="/docs/system-overview"
              className="bg-white hover:bg-gray-50 text-blue-600 font-semibold py-3 px-8 rounded-lg border-2 border-blue-600 transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              System Overview
            </Link>
          </div>
        </header>
        
        {/* Search Section */}
        <section className="mb-16">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                🔍 Search Documentation
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto mb-8">
                Find exactly what you&apos;re looking for with our intelligent semantic search. 
                Search across all documentation files and get instant, relevant results.
              </p>
            </div>
            <div className="max-w-2xl mx-auto">
              <Search placeholder="Search documentation... (e.g., &apos;user authentication&apos;, &apos;payment processing&apos;, &apos;course management&apos;)" />
            </div>
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                💡 Try searching for: &quot;authentication&quot;, &quot;payment&quot;, &quot;course creation&quot;, &quot;scheduling&quot;
              </p>
            </div>
          </div>
        </section>
        
        {/* Browse Links */}
        <section className="mb-16">
          <div className="text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/docs/system-overview"
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition-colors shadow-lg hover:shadow-xl"
              >
                📋 System Overview
              </Link>
              <Link
                href="/docs"
                className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 px-8 rounded-lg transition-colors shadow-lg hover:shadow-xl"
              >
                📚 Browse All Docs
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
