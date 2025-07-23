"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search as SearchIcon, Loader2, FileText } from "lucide-react";

interface SearchResult {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  score: number;
}

interface SearchResponse {
  results: SearchResult[];
  total: number;
  query: string;
}

interface SearchProps {
  placeholder?: string;
  className?: string;
  showIcon?: boolean;
  variant?: "default" | "compact";
}

export default function Search({
  placeholder = "Search documentation...",
  className = "",
  showIcon = true,
  variant = "default",
}: SearchProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Debounced search
  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const timeoutId = setTimeout(async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `/api/search?q=${encodeURIComponent(query)}`,
        );
        const data: SearchResponse = await response.json();
        setResults(data.results || []);
        setIsOpen(true);
        setSelectedIndex(-1);
      } catch (error) {
        console.error("Search error:", error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) =>
            prev < results.length - 1 ? prev + 1 : prev,
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
          break;
        case "Enter":
          e.preventDefault();
          if (selectedIndex >= 0 && results[selectedIndex]) {
            router.push(`/docs/${results[selectedIndex].slug}`);
            setIsOpen(false);
            setQuery("");
          }
          break;
        case "Escape":
          setIsOpen(false);
          setSelectedIndex(-1);
          inputRef.current?.blur();
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, selectedIndex, results, router]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleResultClick = (slug: string) => {
    router.push(`/docs/${slug}`);
    setIsOpen(false);
    setQuery("");
  };

  const highlightText = (text: string, query: string) => {
    if (!query) return text;

    const regex = new RegExp(
      `(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
      "gi",
    );
    const parts = text.split(regex);

    return parts.map((part, index) =>
      regex.test(part) ? (
        <mark
          key={index}
          className="bg-yellow-200 text-yellow-900 px-1 rounded"
        >
          {part}
        </mark>
      ) : (
        part
      ),
    );
  };

  const baseInputClasses =
    variant === "compact"
      ? "w-full px-3 py-2 text-sm"
      : "w-full px-4 py-3 text-base";

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <div className="relative">
        {showIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon className="h-5 w-5 text-gray-400" />
          </div>
        )}

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.length >= 2 && setIsOpen(true)}
          placeholder={placeholder}
          className={`
            ${baseInputClasses}
            ${showIcon ? "pl-10" : ""}
            border border-gray-300 rounded-lg
            focus:ring-2 focus:ring-blue-500 focus:border-blue-500
            bg-white shadow-sm
            transition-all duration-200
          `}
        />

        {isLoading && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <Loader2 className="h-4 w-4 text-blue-500 animate-spin" />
          </div>
        )}
      </div>

      {/* Search Results Dropdown */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-96 overflow-y-auto">
          {results.length > 0 ? (
            <>
              <div className="px-4 py-2 text-xs text-gray-500 border-b border-gray-100">
                {results.length} result{results.length !== 1 ? "s" : ""} for
                &quot;{query}&quot;
              </div>
              {results.map((result, index) => (
                <div
                  key={result.slug}
                  className={`
                    px-4 py-3 cursor-pointer border-b border-gray-50 last:border-b-0
                    transition-colors duration-150
                    ${
                      index === selectedIndex
                        ? "bg-blue-50 border-blue-100"
                        : "hover:bg-gray-50"
                    }
                  `}
                  onClick={() => handleResultClick(result.slug)}
                >
                  <div className="font-medium text-gray-900 mb-1">
                    {highlightText(result.title, query)}
                  </div>
                  <div className="text-sm text-gray-600 line-clamp-2">
                    {highlightText(result.excerpt, query)}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    /docs/{result.slug}
                  </div>
                </div>
              ))}
            </>
          ) : query.length >= 2 && !isLoading ? (
            <div className="px-4 py-8 text-center text-gray-500">
              <FileText className="mx-auto h-12 w-12 text-gray-300 mb-4" />
              <p className="text-sm">
                No results found for &quot;{query}&quot;
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Try different keywords or check spelling
              </p>
            </div>
          ) : null}

          {results.length > 0 && (
            <div className="px-4 py-2 text-xs text-gray-400 border-t border-gray-100 bg-gray-50">
              Use ↑↓ to navigate, Enter to select, Esc to close
            </div>
          )}
        </div>
      )}
    </div>
  );
}
