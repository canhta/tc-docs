import fs from "fs";
import path from "path";
import Link from "next/link";
import { ArrowRight, Home } from "lucide-react";

interface DocFile {
  slug: string;
  title: string;
  filename: string;
  description: string;
  category: string;
}

// Function to extract title and description from markdown content
function extractMetadata(content: string): {
  title: string;
  description: string;
} {
  const lines = content.split("\n");
  let title = "";
  let description = "";

  // Find the first heading
  for (const line of lines) {
    if (line.startsWith("#") && !title) {
      title = line.replace(/^#+\s*/, "").trim();
      continue;
    }
    // Find first paragraph after title for description
    if (
      title &&
      line.trim() &&
      !line.startsWith("#") &&
      !line.startsWith("**") &&
      line.length > 20
    ) {
      description =
        line.trim().substring(0, 150) + (line.length > 150 ? "..." : "");
      break;
    }
  }

  return {
    title: title || "Untitled",
    description: description || "No description available.",
  };
}

// Function to categorize documents
function categorizeDoc(filename: string): string {
  const name = filename.toLowerCase();

  if (name.includes("system") || name.includes("overview"))
    return "System Overview";
  if (name.includes("user") || name.includes("authentication"))
    return "User Management";
  if (
    name.includes("course") ||
    name.includes("lesson") ||
    name.includes("learning")
  )
    return "Education & Learning";
  if (
    name.includes("payment") ||
    name.includes("billing") ||
    name.includes("payroll")
  )
    return "Financial Management";
  if (name.includes("communication") || name.includes("message"))
    return "Communication";
  if (name.includes("schedule") || name.includes("calendar"))
    return "Scheduling";
  if (name.includes("homework") || name.includes("assignment"))
    return "Assignments";
  if (
    name.includes("group") ||
    name.includes("room") ||
    name.includes("resource")
  )
    return "Resource Management";
  if (name.includes("search") || name.includes("discovery"))
    return "Search & Discovery";
  if (name.includes("store") || name.includes("ecommerce")) return "E-commerce";
  if (name.includes("file") || name.includes("storage"))
    return "File Management";
  if (
    name.includes("analytics") ||
    name.includes("intelligence") ||
    name.includes("business")
  )
    return "Business Intelligence";
  if (name.includes("workflow") || name.includes("practice"))
    return "Workflows";
  if (name.includes("competitive") || name.includes("market"))
    return "Strategic Analysis";
  if (name.includes("audit") || name.includes("logging"))
    return "Audit & Compliance";
  if (name.includes("integration") || name.includes("api"))
    return "Integrations";
  if (name.includes("automation") || name.includes("background"))
    return "Automation";

  return "General Documentation";
}

export default function DocsIndexPage() {
  const docsDirectory = path.join(process.cwd(), "app/docs");
  const filenames = fs.readdirSync(docsDirectory);

  const docs: DocFile[] = filenames
    .filter((name) => name.endsWith(".md"))
    .map((filename) => {
      const slug = filename.replace(/\.md$/, "");
      const filePath = path.join(docsDirectory, filename);
      const content = fs.readFileSync(filePath, "utf8");
      const { title, description } = extractMetadata(content);
      const category = categorizeDoc(filename);

      return {
        slug,
        title,
        filename,
        description,
        category,
      };
    })
    .sort((a, b) => a.title.localeCompare(b.title));

  // Group docs by category
  const groupedDocs = docs.reduce(
    (acc, doc) => {
      if (!acc[doc.category]) {
        acc[doc.category] = [];
      }
      acc[doc.category].push(doc);
      return acc;
    },
    {} as Record<string, DocFile[]>,
  );

  const categories = Object.keys(groupedDocs).sort();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            TC Documentation Center
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive documentation for the TC music education platform.
            Explore our complete system overview, feature specifications, and
            implementation guides.
          </p>
          <div className="mt-6">
            <Link
              href="/"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              <Home className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {docs.length}
            </div>
            <div className="text-gray-600">Total Documents</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {categories.length}
            </div>
            <div className="text-gray-600">Categories</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">100%</div>
            <div className="text-gray-600">Coverage</div>
          </div>
        </div>

        {/* Documentation List by Category */}
        <div className="space-y-10">
          {categories.map((category) => (
            <section key={category}>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                {category}
              </h2>
              <div className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-100">
                {groupedDocs[category].map((doc) => (
                  <Link
                    key={doc.slug}
                    href={`/docs/${doc.slug}`}
                    className="group block p-4 hover:bg-gray-50 transition-colors duration-200"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-medium text-gray-900 group-hover:text-blue-600 transition-colors mb-1">
                          {doc.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                          {doc.description}
                        </p>
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                          {doc.filename}
                        </span>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <ArrowRight className="h-5 w-5 text-blue-600 group-hover:text-blue-800 transition-colors" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
