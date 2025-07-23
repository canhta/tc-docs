'use client';

import { MDXRemote } from 'next-mdx-remote/rsc';
import { useMDXComponents } from '../../../mdx-components';

// Process markdown content to handle special characters
function sanitizeMarkdownForMDX(content: string): string {
  // Replace problematic characters that cause MDX parsing issues
  return content
    .replace(/✅/g, '✓') // Replace checkmark emoji with simpler character
    .replace(/📊/g, '[Chart]') // Replace chart emoji
    .replace(/🎯/g, '[Target]') // Replace target emoji
    .replace(/🚀/g, '[Rocket]') // Replace rocket emoji
    .replace(/💳/g, '[Card]') // Replace card emoji
    .replace(/📅/g, '[Calendar]') // Replace calendar emoji
    .replace(/💬/g, '[Chat]') // Replace chat emoji
    .replace(/→/g, '->') // Replace arrow
    .replace(/←/g, '<-') // Replace left arrow
    .replace(/×/g, '*') // Replace multiplication sign
    .replace(/–/g, '-') // Replace en dash
    .replace(/—/g, '--'); // Replace em dash
}

// Client component for MDX rendering
export function MDXContent({ content }: { content: string }) {
  const components = useMDXComponents({});
  const sanitizedContent = sanitizeMarkdownForMDX(content);
  return <MDXRemote source={sanitizedContent} components={components} />;
}