import Link from "next/link";
import { Clock } from "lucide-react";
import { BLOG_CATEGORY_LABELS } from "@/lib/types";
import type { Post } from "@/lib/types";

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

export default function BlogPostHeader({ post }: { post: Post }) {
  return (
    <header className="mb-12">
      <nav className="flex items-center gap-2 text-sm text-foreground/50 mb-6" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-accent transition-colors">
          Início
        </Link>
        <span>/</span>
        <Link href="/blog" className="hover:text-accent transition-colors">
          Blog
        </Link>
        <span>/</span>
        <Link
          href={`/blog/categoria/${post.category}`}
          className="hover:text-accent transition-colors"
        >
          {BLOG_CATEGORY_LABELS[post.category]}
        </Link>
      </nav>

      <span className="text-xs font-medium text-accent uppercase tracking-wide">
        {BLOG_CATEGORY_LABELS[post.category]}
      </span>

      <h1 className="font-heading text-3xl md:text-5xl font-bold mt-3 mb-6 leading-tight">
        {post.title}
      </h1>

      <div className="flex items-center gap-4 text-sm text-foreground/50">
        <span>{formatDate(post.date)}</span>
        <span className="flex items-center gap-1">
          <Clock size={14} />
          {post.readingTime} min de leitura
        </span>
      </div>
    </header>
  );
}
