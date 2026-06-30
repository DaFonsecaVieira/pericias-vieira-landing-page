export const BLOG_CATEGORIES = [
  "fundamentos-grafotecnicos",
  "fraude-bancaria-consignado",
  "direito-sucessorio",
  "direito-trabalhista",
  "imobiliario",
  "estrategia-juridica-processual",
  "seo-local-manaus-am",
  "casos-aplicacoes-praticas",
  "tecnico-metodologico",
  "institucional-conversao",
] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

export const BLOG_CATEGORY_LABELS: Record<BlogCategory, string> = {
  "fundamentos-grafotecnicos": "Fundamentos Grafotécnicos",
  "fraude-bancaria-consignado": "Fraude Bancária e Consignado",
  "direito-sucessorio": "Direito Sucessório",
  "direito-trabalhista": "Direito Trabalhista",
  imobiliario: "Imobiliário",
  "estrategia-juridica-processual": "Estratégia Jurídica e Processual",
  "seo-local-manaus-am": "Perícia em Manaus e Amazonas",
  "casos-aplicacoes-praticas": "Casos e Aplicações Práticas",
  "tecnico-metodologico": "Técnico e Metodológico",
  "institucional-conversao": "Institucional",
};

export interface PostFrontmatter {
  title: string;
  slug: string;
  description: string;
  date: string;
  category: BlogCategory;
  tags?: string[];
  ogImage?: string;
  draft?: boolean;
}

export interface Post extends PostFrontmatter {
  readingTime: number;
  content: string;
}
