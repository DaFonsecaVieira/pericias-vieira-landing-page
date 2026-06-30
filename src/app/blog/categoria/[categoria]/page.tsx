import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { BLOG_CATEGORIES, BLOG_CATEGORY_LABELS } from "@/lib/types";
import type { BlogCategory } from "@/lib/types";
import { getPostsByCategory, paginate, totalPages, POSTS_PER_PAGE } from "@/lib/posts";
import { SITE_URL } from "@/lib/constants";
import BlogListing from "@/components/blog/BlogListing";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export function generateStaticParams() {
  return BLOG_CATEGORIES.map((categoria) => ({ categoria }));
}

function isValidCategory(value: string): value is BlogCategory {
  return (BLOG_CATEGORIES as readonly string[]).includes(value);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ categoria: string }>;
}): Promise<Metadata> {
  const { categoria } = await params;
  if (!isValidCategory(categoria)) return {};
  const label = BLOG_CATEGORY_LABELS[categoria];
  return {
    title: `${label} | Blog Signa Veritas`,
    description: `Artigos sobre ${label.toLowerCase()} escritos pela Signa Veritas, perícia grafotécnica em Manaus.`,
    alternates: { canonical: `${SITE_URL}/blog/categoria/${categoria}` },
  };
}

export default async function BlogCategoryPage({
  params,
}: {
  params: Promise<{ categoria: string }>;
}) {
  const { categoria } = await params;
  if (!isValidCategory(categoria)) notFound();

  const allPosts = getPostsByCategory(categoria);
  const pages = totalPages(allPosts.length);
  const posts = paginate(allPosts, 1, POSTS_PER_PAGE);
  const label = BLOG_CATEGORY_LABELS[categoria];

  return (
    <>
      <Header />
      <BlogListing
        posts={posts}
        currentPage={1}
        totalPages={pages}
        basePath={`/blog/categoria/${categoria}`}
        activeCategory={categoria}
        title={label}
        description={`Artigos do blog Signa Veritas na categoria ${label}.`}
      />
      <Footer />
    </>
  );
}
