import type { Metadata } from "next";
import { getAllPosts, paginate, totalPages, POSTS_PER_PAGE } from "@/lib/posts";
import { SITE_URL } from "@/lib/constants";
import BlogListing from "@/components/blog/BlogListing";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Blog | Signa Veritas - Perícia Grafotécnica",
  description:
    "Artigos técnicos sobre perícia grafotécnica, fraude documental, direito sucessório, trabalhista e estratégia processual para advogados em Manaus e em todo o Brasil.",
  alternates: { canonical: `${SITE_URL}/blog` },
};

export default function BlogIndexPage() {
  const allPosts = getAllPosts();
  const pages = totalPages(allPosts.length);
  const posts = paginate(allPosts, 1, POSTS_PER_PAGE);

  return (
    <>
      <Header />
      <BlogListing
        posts={posts}
        currentPage={1}
        totalPages={pages}
        basePath="/blog"
        title="Blog Signa Veritas"
        description="Conteúdo técnico sobre perícia grafotécnica, prova documental e estratégia processual, escrito para advogados e para quem precisa entender seus direitos diante de um documento contestado."
      />
      <Footer />
    </>
  );
}
