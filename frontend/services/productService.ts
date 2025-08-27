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

interface FetchProductsParams {
  limit?: number;
  skip?: number;
  q?: string;
}

export async function fetchProducts({ limit = 30, skip = 0, q }: FetchProductsParams = {}): Promise<ProductListResponse> {
  const searchParams = new URLSearchParams();
  searchParams.set('limit', String(limit));
  searchParams.set('skip', String(skip));
  if (q) {
    searchParams.set('q', q);
  }

  const url = `https://dummyjson.com/products${q ? '/search' : ''}?${searchParams.toString()}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }
  return (await res.json()) as ProductListResponse;
}

export async function fetchProduct(id: number | string): Promise<Product> {
  const res = await fetch(`https://dummyjson.com/products/${id}`);
  if (!res.ok) {
    throw new Error('Failed to fetch product');
  }
  return (await res.json()) as Product;
}
