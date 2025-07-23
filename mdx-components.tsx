"use client";

import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import Link from "next/link";

// This file allows you to provide custom React components
// to be used in MDX files. You can import and use any
// React component you want, including inline styles,
// components from other libraries, and more.

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Allows customizing built-in components, e.g. to add styling.
    h1: ({ children }) => (
      <h1 className="text-4xl font-bold text-gray-900 mb-6 border-b border-gray-200 pb-4">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-semibold text-gray-800 mb-4 mt-8">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-semibold text-gray-700 mb-3 mt-6">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-xl font-medium text-gray-700 mb-2 mt-4">
        {children}
      </h4>
    ),
    p: ({ children }) => (
      <p className="text-gray-600 mb-4 leading-relaxed">{children}</p>
    ),
    ul: ({ children }) => (
      <ul className="list-disc list-inside mb-4 space-y-2 text-gray-600">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-inside mb-4 space-y-2 text-gray-600">
        {children}
      </ol>
    ),
    li: ({ children }) => <li className="ml-4">{children}</li>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-blue-500 pl-4 py-2 mb-4 bg-blue-50 text-gray-700 italic">
        {children}
      </blockquote>
    ),
    code: ({ children, className }) => {
      // Check if it's inline code (no className) or code block
      const isInline = !className;

      if (isInline) {
        return (
          <code className="bg-gradient-to-r from-slate-100 to-slate-50 text-slate-800 px-2.5 py-1 rounded-md text-sm font-mono border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-200 font-semibold">
            {children}
          </code>
        );
      }

      // For code blocks, return the code element with language class
      return <code className={className}>{children}</code>;
    },
    pre: ({ children, ...props }) => {
      // Extract language from className if available
      const codeElement = children as React.ReactElement<{
        className?: string;
        children?: string;
      }>;
      const language =
        codeElement?.props?.className?.replace("language-", "") || "text";

      return (
        <div className="relative group mb-6 shadow-lg rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700">
          {/* Language label */}
          <div className="flex items-center justify-between bg-gradient-to-r from-slate-800 to-slate-900 text-slate-200 px-4 py-3 text-xs font-semibold">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500 opacity-80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500 opacity-80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500 opacity-80"></div>
              </div>
              <span className="uppercase tracking-wider text-slate-300 font-mono">
                {language}
              </span>
            </div>
            <button
              onClick={() => {
                const code = codeElement?.props?.children || "";
                navigator.clipboard.writeText(code);
              }}
              className="opacity-0 group-hover:opacity-100 transition-all duration-300 bg-slate-700/50 hover:bg-slate-600 active:bg-slate-500 px-3 py-1.5 rounded-md text-xs flex items-center gap-2 border border-slate-600 hover:border-slate-500 backdrop-blur-sm"
              title="Copy code"
            >
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              <span className="font-medium">Copy</span>
            </button>
          </div>
          {/* Code content */}
          <pre
            className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 text-slate-100 p-6 overflow-x-auto text-sm leading-relaxed relative"
            style={{
              fontFamily:
                'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
              background:
                "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)",
            }}
            {...props}
          >
            {children}
            {/* Subtle grid pattern overlay */}
            <div
              className="absolute inset-0 opacity-5 pointer-events-none"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)",
                backgroundSize: "20px 20px",
              }}
            ></div>
          </pre>
        </div>
      );
    },
    a: ({ href, children }) => {
      // Check if it's an internal link
      if (href?.startsWith("/") || href?.startsWith("#")) {
        return (
          <Link
            href={href}
            className="text-blue-600 hover:text-blue-800 underline"
          >
            {children}
          </Link>
        );
      }
      // External link
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 underline"
        >
          {children}
        </a>
      );
    },
    img: ({ src, alt, ...props }) => (
      <Image
        src={src || ""}
        alt={alt || ""}
        width={800}
        height={400}
        className="rounded-lg shadow-md mb-4"
        style={{ width: "100%", height: "auto" }}
        {...props}
      />
    ),
    table: ({ children }) => (
      <div className="overflow-x-auto mb-4">
        <table className="min-w-full border border-gray-300">{children}</table>
      </div>
    ),
    th: ({ children }) => (
      <th className="border border-gray-300 bg-gray-100 px-4 py-2 text-left font-semibold text-gray-700">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="border border-gray-300 px-4 py-2 text-gray-600">
        {children}
      </td>
    ),
    strong: ({ children }) => (
      <strong className="font-semibold text-gray-800">{children}</strong>
    ),
    em: ({ children }) => <em className="italic text-gray-700">{children}</em>,
    hr: () => <hr className="border-gray-300 my-8" />,
    ...components,
  };
}
