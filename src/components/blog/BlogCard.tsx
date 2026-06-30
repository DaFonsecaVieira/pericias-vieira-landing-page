import Link from "next/link";
import { ArrowRight } from "lucide-react";
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

export default function BlogCard({ post }: { post: Post }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="bg-white/5 border border-white/10 rounded-lg p-8 hover:border-accent/30 transition-all group flex flex-col h-full"
    >
      <span className="text-xs font-medium text-accent uppercase tracking-wide mb-3">
        {BLOG_CATEGORY_LABELS[post.category]}
      </span>
      <h3 className="font-heading text-xl font-bold mb-3 leading-snug group-hover:text-accent transition-colors">
        {post.title}
      </h3>
      <p className="text-foreground/70 text-sm mb-6 flex-1">{post.description}</p>
      <div className="flex items-center justify-between text-xs text-foreground/50 mt-auto pt-4 border-t border-white/10">
        <span>{formatDate(post.date)}</span>
        <span className="flex items-center gap-1 text-accent group-hover:gap-2 transition-all">
          Ler mais <ArrowRight size={14} />
        </span>
      </div>
    </Link>
  );
}
