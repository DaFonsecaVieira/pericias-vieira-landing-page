import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllPosts, paginate, totalPages, staticPaginationParams, POSTS_PER_PAGE } from "@/lib/posts";
import { SITE_URL } from "@/lib/constants";
import BlogListing from "@/components/blog/BlogListing";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export function generateStaticParams() {
  return staticPaginationParams(getAllPosts().length).map((page) => ({ page: String(page) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ page: string }>;
}): Promise<Metadata> {
  const { page } = await params;
  return {
    title: `Blog | Página ${page} | Signa Veritas`,
    alternates: { canonical: `${SITE_URL}/blog/page/${page}` },
  };
}

export default async function BlogPagePagination({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const { page } = await params;
  const pageNumber = Number(page);
  const allPosts = getAllPosts();
  const pages = totalPages(allPosts.length);
  const validStaticPages = staticPaginationParams(allPosts.length);

  if (!Number.isInteger(pageNumber) || pageNumber < 2 || !validStaticPages.includes(pageNumber)) {
    notFound();
  }

  const posts = pageNumber <= pages ? paginate(allPosts, pageNumber, POSTS_PER_PAGE) : [];

  return (
    <>
      <Header />
      <BlogListing
        posts={posts}
        currentPage={pageNumber}
        totalPages={Math.max(pages, pageNumber)}
        basePath="/blog"
        title="Blog Signa Veritas"
        description="Conteúdo técnico sobre perícia grafotécnica, prova documental e estratégia processual, escrito para advogados e para quem precisa entender seus direitos diante de um documento contestado."
      />
      <Footer />
    </>
  );
}
