import BlogCard from "./BlogCard";
import BlogCategoryFilter from "./BlogCategoryFilter";
import BlogPagination from "./BlogPagination";
import type { BlogCategory, Post } from "@/lib/types";

interface BlogListingProps {
  posts: Post[];
  currentPage: number;
  totalPages: number;
  basePath: string;
  activeCategory?: BlogCategory;
  title: string;
  description: string;
}

export default function BlogListing({
  posts,
  currentPage,
  totalPages,
  basePath,
  activeCategory,
  title,
  description,
}: BlogListingProps) {
  return (
    <section className="py-32 bg-primary relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mb-12">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">{title}</h1>
          <p className="text-foreground/70">{description}</p>
        </div>

        <BlogCategoryFilter active={activeCategory} />

        {posts.length === 0 ? (
          <p className="text-foreground/60">Nenhum artigo encontrado por aqui ainda. Novos conteúdos chegam em breve.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        )}

        <BlogPagination currentPage={currentPage} totalPages={totalPages} basePath={basePath} />
      </div>
    </section>
  );
}
