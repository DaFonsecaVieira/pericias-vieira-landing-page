import Link from "next/link";
import { BLOG_CATEGORIES, BLOG_CATEGORY_LABELS } from "@/lib/types";
import type { BlogCategory } from "@/lib/types";

export default function BlogCategoryFilter({ active }: { active?: BlogCategory }) {
  return (
    <div className="flex flex-wrap gap-2 mb-12">
      <Link
        href="/blog"
        className={`text-sm font-medium py-2 px-4 rounded-sm border transition-all ${
          !active
            ? "bg-accent text-primary border-accent"
            : "border-white/10 hover:border-accent/30 hover:text-accent"
        }`}
      >
        Todos
      </Link>
      {BLOG_CATEGORIES.map((category) => (
        <Link
          key={category}
          href={`/blog/categoria/${category}`}
          className={`text-sm font-medium py-2 px-4 rounded-sm border transition-all ${
            active === category
              ? "bg-accent text-primary border-accent"
              : "border-white/10 hover:border-accent/30 hover:text-accent"
          }`}
        >
          {BLOG_CATEGORY_LABELS[category]}
        </Link>
      ))}
    </div>
  );
}
