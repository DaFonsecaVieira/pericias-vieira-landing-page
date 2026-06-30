import readingTime from "reading-time";
import { getAllSlugsRaw, readPostSource } from "./mdx";
import type { BlogCategory, Post, PostFrontmatter } from "./types";

export const POSTS_PER_PAGE = 9;

function buildPost(slug: string): Post {
  const { data, content } = readPostSource(slug);
  const frontmatter = data as PostFrontmatter;

  if (!frontmatter.title || !frontmatter.date || !frontmatter.category) {
    throw new Error(`Post "${slug}" está com frontmatter incompleto (title/date/category obrigatórios).`);
  }

  return {
    ...frontmatter,
    slug: frontmatter.slug ?? slug,
    readingTime: Math.ceil(readingTime(content).minutes),
    content,
  };
}

function getAllPostsRaw(): Post[] {
  return getAllSlugsRaw()
    .map(buildPost)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

export function getAllPosts(): Post[] {
  const now = new Date();
  return getAllPostsRaw().filter((p) => !p.draft && new Date(p.date) <= now);
}

export function getAllPostsIncludingFuture(): Post[] {
  return getAllPostsRaw();
}

export function getPostBySlug(slug: string): Post | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

export function getPostsByCategory(category: BlogCategory): Post[] {
  return getAllPosts().filter((p) => p.category === category);
}

export function paginate<T>(items: T[], page: number, perPage = POSTS_PER_PAGE): T[] {
  const start = (page - 1) * perPage;
  return items.slice(start, start + perPage);
}

export function totalPages(itemCount: number, perPage = POSTS_PER_PAGE): number {
  return Math.max(1, Math.ceil(itemCount / perPage));
}

/**
 * Page numbers to pre-render for a paginated route, beyond page 1.
 * `output: export` requires every dynamic route to produce at least one
 * static param, so page 2 is always included as a placeholder even when
 * there isn't enough content for it yet (renders an empty state instead of 404).
 */
export function staticPaginationParams(itemCount: number, perPage = POSTS_PER_PAGE): number[] {
  const pages = totalPages(itemCount, perPage);
  const last = Math.max(2, pages);
  return Array.from({ length: last - 1 }, (_, i) => i + 2);
}
