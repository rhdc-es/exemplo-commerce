export interface Product {
  id: number;
  title: string;
}

export interface ProductResponse {
  products: Product[];
  total: number;
  limit: number;
  skip: number;
}

export async function listProducts(limit: number, skip: number): Promise<ProductResponse> {
  const res = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`);
  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }
  return res.json();
}
