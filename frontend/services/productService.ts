// types.ts (ou onde você preferir)

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface ProductListResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface FetchProductsParams {
  /** termo de busca */
  q?: string;
  /** slug da categoria (ex.: "smartphones") */
  category?: string;
  /** paginação */
  limit?: number;
  skip?: number;
}

/**
 * Busca produtos com suporte a:
 * - lista geral (/products)
 * - busca por termo (/products/search?q=...)
 * - filtro por categoria (/products/category/:category)
 * Todos com paginação (limit/skip).
 */
export async function fetchProducts(
  { q, category, limit = 30, skip = 0 }: FetchProductsParams = {}
): Promise<ProductListResponse> {
  let base = 'https://dummyjson.com/products';

  if (q) {
    base += '/search';
  } else if (category) {
    base += `/category/${encodeURIComponent(category)}`;
  }

  const params = new URLSearchParams();
  params.set('limit', String(limit));
  params.set('skip', String(skip));
  if (q) params.set('q', q);

  const url = `${base}?${params.toString()}`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }
  return (await res.json()) as ProductListResponse;
}

/** Busca um produto pelo ID */
export async function fetchProduct(id: number | string): Promise<Product> {
  const res = await fetch(`https://dummyjson.com/products/${id}`);
  if (!res.ok) {
    throw new Error('Failed to fetch product');
  }
  return (await res.json()) as Product;
}

/** Lista as categorias disponíveis */
export async function fetchCategories(): Promise<string[]> {
  const res = await fetch('https://dummyjson.com/products/categories');
  if (!res.ok) {
    throw new Error('Failed to fetch categories');
  }
  return (await res.json()) as string[];
}
