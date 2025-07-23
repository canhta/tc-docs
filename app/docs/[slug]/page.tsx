import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import { MDXContent } from './mdx-content';

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Get all markdown files for static generation
export async function generateStaticParams() {
  const docsDirectory = path.join(process.cwd(), 'app/docs');
  const filenames = fs.readdirSync(docsDirectory);
  
  return filenames
    .filter(name => name.endsWith('.md'))
    .map(name => ({
      slug: name.replace(/\.md$/, ''),
    }));
}

// Generate metadata for each page
export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const filePath = path.join(process.cwd(), 'app/docs', `${slug}.md`);
  
  if (!fs.existsSync(filePath)) {
    return {
      title: 'Page Not Found',
    };
  }
  
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const firstLine = fileContent.split('\n')[0];
  const title = firstLine.startsWith('#') ? firstLine.replace(/^#+\s*/, '') : slug;
  
  return {
    title: `${title} | TC Docs`,
    description: `Documentation for ${title}`,
  };
}



export default async function DocPage({ params }: PageProps) {
  const { slug } = await params;
  const filePath = path.join(process.cwd(), 'app/docs', `${slug}.md`);
  
  // Check if file exists
  if (!fs.existsSync(filePath)) {
    notFound();
  }
  
  // Read the markdown file
  const fileContent = fs.readFileSync(filePath, 'utf8');
  
  // Get all available docs for navigation
  const docsDirectory = path.join(process.cwd(), 'app/docs');
  const allDocs = fs.readdirSync(docsDirectory)
    .filter(name => name.endsWith('.md'))
    .map(name => {
      const docSlug = name.replace(/\.md$/, '');
      const docPath = path.join(docsDirectory, name);
      const docContent = fs.readFileSync(docPath, 'utf8');
      const firstLine = docContent.split('\n')[0];
      const title = firstLine.startsWith('#') ? firstLine.replace(/^#+\s*/, '') : docSlug;
      
      return {
        slug: docSlug,
        title,
        filename: name,
      };
    })
    .sort((a, b) => a.title.localeCompare(b.title));
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <aside className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-8">
              <div className="mb-4">
                <Link 
                  href="/"
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  ← Back to Home
                </Link>
              </div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Documentation
              </h2>
              <nav className="space-y-2">
                {allDocs.map((doc) => (
                  <Link
                    key={doc.slug}
                    href={`/docs/${doc.slug}`}
                    className={`block px-3 py-2 rounded-md text-sm transition-colors ${
                      doc.slug === slug
                        ? 'bg-blue-100 text-blue-700 font-medium'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    {doc.title}
                  </Link>
                ))}
              </nav>
            </div>
          </aside>
          
          {/* Main Content */}
          <main className="lg:w-3/4">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
              <article className="prose prose-lg max-w-none">
                <MDXContent content={fileContent} />
              </article>
              
              {/* Footer Navigation */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    Last updated: {new Date().toLocaleDateString()}
                  </div>
                  <Link
                    href="/docs"
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    View All Documentation →
                  </Link>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}