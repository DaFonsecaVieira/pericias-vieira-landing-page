import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllPosts, paginate, totalPages, POSTS_PER_PAGE } from "@/lib/posts";
import { SITE_URL } from "@/lib/constants";
import BlogListing from "@/components/blog/BlogListing";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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

  if (!Number.isInteger(pageNumber) || pageNumber < 2 || pageNumber > pages) {
    notFound();
  }

  const posts = paginate(allPosts, pageNumber, POSTS_PER_PAGE);

  return (
    <>
      <Header />
      <BlogListing
        posts={posts}
        currentPage={pageNumber}
        totalPages={pages}
        basePath="/blog"
        title="Blog Signa Veritas"
        description="Conteúdo técnico sobre perícia grafotécnica, prova documental e estratégia processual, escrito para advogados e para quem precisa entender seus direitos diante de um documento contestado."
      />
      <Footer />
    </>
  );
}
