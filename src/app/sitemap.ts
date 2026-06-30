import type { MetadataRoute } from "next";
import { getAllPosts, totalPages } from "@/lib/posts";
import { BLOG_CATEGORIES } from "@/lib/types";
import { SITE_URL } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: post.date,
    changeFrequency: "monthly",
  }));

  const blogPaginationEntries: MetadataRoute.Sitemap = Array.from(
    { length: Math.max(0, totalPages(posts.length) - 1) },
    (_, i) => ({
      url: `${SITE_URL}/blog/page/${i + 2}`,
      changeFrequency: "weekly",
    })
  );

  const categoryEntries: MetadataRoute.Sitemap = BLOG_CATEGORIES.map((categoria) => ({
    url: `${SITE_URL}/blog/categoria/${categoria}`,
    changeFrequency: "weekly",
  }));

  return [
    { url: SITE_URL, changeFrequency: "monthly" },
    { url: `${SITE_URL}/blog`, changeFrequency: "weekly" },
    ...blogPaginationEntries,
    ...categoryEntries,
    ...postEntries,
  ];
}
