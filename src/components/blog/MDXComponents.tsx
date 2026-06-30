import Link from "next/link";
import type { MDXComponents as MDXComponentsType } from "mdx/types";
import WhatsAppCTA from "./WhatsAppCTA";

export const mdxComponents: MDXComponentsType = {
  h2: (props) => (
    <h2 className="font-heading text-2xl md:text-3xl font-bold mt-12 mb-5" {...props} />
  ),
  h3: (props) => (
    <h3 className="font-heading text-xl md:text-2xl font-bold mt-10 mb-4" {...props} />
  ),
  p: (props) => <p className="text-foreground/80 leading-relaxed mb-5" {...props} />,
  ul: (props) => (
    <ul className="list-disc list-outside ml-5 mb-5 text-foreground/80 space-y-2" {...props} />
  ),
  ol: (props) => (
    <ol className="list-decimal list-outside ml-5 mb-5 text-foreground/80 space-y-2" {...props} />
  ),
  blockquote: (props) => (
    <blockquote
      className="border-l-2 border-accent pl-6 my-8 italic text-foreground/70"
      {...props}
    />
  ),
  a: ({ href, ...props }) => (
    <Link
      href={href ?? "#"}
      className="text-accent hover:text-accent-light underline underline-offset-2"
      {...props}
    />
  ),
  strong: (props) => <strong className="text-foreground font-semibold" {...props} />,
  hr: () => <hr className="border-white/10 my-10" />,
  WhatsAppCTA,
};
