import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface BlogPaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string; // e.g. "/blog" or "/blog/categoria/imobiliario"
}

function pageHref(basePath: string, page: number) {
  if (page <= 1) return basePath;
  return `${basePath}/page/${page}`;
}

export default function BlogPagination({ currentPage, totalPages, basePath }: BlogPaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="flex items-center justify-center gap-2 mt-16" aria-label="Paginação do blog">
      <Link
        href={pageHref(basePath, currentPage - 1)}
        aria-disabled={currentPage === 1}
        className={`flex items-center justify-center w-10 h-10 rounded-sm border border-white/10 transition-all ${
          currentPage === 1
            ? "opacity-30 pointer-events-none"
            : "hover:border-accent/30 hover:text-accent"
        }`}
      >
        <ChevronLeft size={18} />
      </Link>

      {pages.map((page) => (
        <Link
          key={page}
          href={pageHref(basePath, page)}
          className={`flex items-center justify-center w-10 h-10 rounded-sm border text-sm font-medium transition-all ${
            page === currentPage
              ? "bg-accent text-primary border-accent"
              : "border-white/10 hover:border-accent/30 hover:text-accent"
          }`}
        >
          {page}
        </Link>
      ))}

      <Link
        href={pageHref(basePath, currentPage + 1)}
        aria-disabled={currentPage === totalPages}
        className={`flex items-center justify-center w-10 h-10 rounded-sm border border-white/10 transition-all ${
          currentPage === totalPages
            ? "opacity-30 pointer-events-none"
            : "hover:border-accent/30 hover:text-accent"
        }`}
      >
        <ChevronRight size={18} />
      </Link>
    </nav>
  );
}
