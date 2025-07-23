import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

interface SearchResult {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  score: number;
}

// Simple text similarity scoring function
function calculateScore(query: string, text: string): number {
  const queryWords = query.toLowerCase().split(/\s+/);
  const textLower = text.toLowerCase();
  
  let score = 0;
  
  // Exact phrase match gets highest score
  if (textLower.includes(query.toLowerCase())) {
    score += 10;
  }
  
  // Individual word matches
  queryWords.forEach(word => {
    if (word.length > 2) { // Skip very short words
      const wordCount = (textLower.match(new RegExp(word, 'g')) || []).length;
      score += wordCount * 2;
    }
  });
  
  return score;
}

// Extract meaningful excerpt around search terms
function extractExcerpt(content: string, query: string, maxLength: number = 200): string {
  const queryLower = query.toLowerCase();
  const contentLower = content.toLowerCase();
  
  // Find the first occurrence of the query
  const index = contentLower.indexOf(queryLower);
  
  if (index === -1) {
    // If exact query not found, return beginning of content
    return content.substring(0, maxLength) + (content.length > maxLength ? '...' : '');
  }
  
  // Extract text around the found query
  const start = Math.max(0, index - 50);
  const end = Math.min(content.length, start + maxLength);
  
  let excerpt = content.substring(start, end);
  
  // Add ellipsis if we're not at the beginning/end
  if (start > 0) excerpt = '...' + excerpt;
  if (end < content.length) excerpt = excerpt + '...';
  
  return excerpt;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    
    if (!query || query.trim().length < 2) {
      return NextResponse.json({ results: [], message: 'Query too short' });
    }
    
    const docsDirectory = path.join(process.cwd(), 'app/docs');
    const filenames = fs.readdirSync(docsDirectory)
      .filter(name => name.endsWith('.md'));
    
    const results: SearchResult[] = [];
    
    for (const filename of filenames) {
      const filePath = path.join(docsDirectory, filename);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContents);
      
      const slug = filename.replace(/\.md$/, '');
      const title = data.title || slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      
      // Calculate relevance score
      const titleScore = calculateScore(query, title) * 3; // Title matches are more important
      const contentScore = calculateScore(query, content);
      const totalScore = titleScore + contentScore;
      
      if (totalScore > 0) {
        results.push({
          title,
          slug,
          excerpt: extractExcerpt(content, query),
          content: content.substring(0, 500), // Limit content for performance
          score: totalScore
        });
      }
    }
    
    // Sort by relevance score (highest first)
    results.sort((a, b) => b.score - a.score);
    
    // Limit to top 10 results
    const limitedResults = results.slice(0, 10);
    
    return NextResponse.json({
      results: limitedResults,
      total: limitedResults.length,
      query
    });
    
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}