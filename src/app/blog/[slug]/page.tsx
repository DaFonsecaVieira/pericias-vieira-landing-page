import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { mdxComponents } from "@/components/blog/MDXComponents";
import BlogPostHeader from "@/components/blog/BlogPostHeader";
import WhatsAppCTA from "@/components/blog/WhatsAppCTA";
import { generateArticleJsonLd, generateBreadcrumbJsonLd } from "@/lib/jsonld";
import { SITE_URL } from "@/lib/constants";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const url = `${SITE_URL}/blog/${post.slug}`;
  const image = post.ogImage ? `${SITE_URL}${post.ogImage}` : `${SITE_URL}/logo.png`;

  return {
    title: `${post.title} | Signa Veritas`,
    description: post.description,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      type: "article",
      publishedTime: post.date,
      images: [{ url: image }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [image],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const articleJsonLd = generateArticleJsonLd(post);
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Início", url: SITE_URL },
    { name: "Blog", url: `${SITE_URL}/blog` },
    { name: post.title, url: `${SITE_URL}/blog/${post.slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Header />
      <main className="py-32 bg-primary">
        <article className="container mx-auto px-4 max-w-3xl">
          <BlogPostHeader post={post} />
          <div className="prose-blog">
            <MDXRemote source={post.content} components={mdxComponents} />
          </div>
          <WhatsAppCTA variant="block" />
        </article>
      </main>
      <Footer />
    </>
  );
}
