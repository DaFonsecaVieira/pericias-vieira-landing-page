import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { BLOG_CATEGORIES, BLOG_CATEGORY_LABELS } from "@/lib/types";
import type { BlogCategory } from "@/lib/types";
import { getPostsByCategory, paginate, totalPages, POSTS_PER_PAGE } from "@/lib/posts";
import { SITE_URL } from "@/lib/constants";
import BlogListing from "@/components/blog/BlogListing";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

function isValidCategory(value: string): value is BlogCategory {
  return (BLOG_CATEGORIES as readonly string[]).includes(value);
}

export function generateStaticParams() {
  const params = BLOG_CATEGORIES.flatMap((categoria) => {
    const pages = totalPages(getPostsByCategory(categoria).length);
    return Array.from({ length: Math.max(0, pages - 1) }, (_, i) => ({
      categoria,
      page: String(i + 2),
    }));
  });

  // `output: export` requires this dynamic route to produce at least one
  // static param. Until any category has enough posts for a real page 2,
  // pre-render a single placeholder that renders an empty state.
  if (params.length === 0) {
    return [{ categoria: BLOG_CATEGORIES[0], page: "2" }];
  }

  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ categoria: string; page: string }>;
}): Promise<Metadata> {
  const { categoria, page } = await params;
  if (!isValidCategory(categoria)) return {};
  const label = BLOG_CATEGORY_LABELS[categoria];
  return {
    title: `${label} | Página ${page} | Blog Signa Veritas`,
    alternates: { canonical: `${SITE_URL}/blog/categoria/${categoria}/page/${page}` },
  };
}

export default async function BlogCategoryPagePagination({
  params,
}: {
  params: Promise<{ categoria: string; page: string }>;
}) {
  const { categoria, page } = await params;
  if (!isValidCategory(categoria)) notFound();

  const pageNumber = Number(page);
  const allPosts = getPostsByCategory(categoria);
  const pages = totalPages(allPosts.length);

  if (!Number.isInteger(pageNumber) || pageNumber < 2) notFound();

  const posts = pageNumber <= pages ? paginate(allPosts, pageNumber, POSTS_PER_PAGE) : [];
  const label = BLOG_CATEGORY_LABELS[categoria];

  return (
    <>
      <Header />
      <BlogListing
        posts={posts}
        currentPage={pageNumber}
        totalPages={Math.max(pages, pageNumber)}
        basePath={`/blog/categoria/${categoria}`}
        activeCategory={categoria}
        title={label}
        description={`Artigos do blog Signa Veritas na categoria ${label}.`}
      />
      <Footer />
    </>
  );
}
