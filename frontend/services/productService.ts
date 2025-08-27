export interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  category: string;
}

export async function fetchProducts(params: { q?: string; category?: string } = {}): Promise<Product[]> {
  const { q, category } = params;
  let url = 'https://dummyjson.com/products';
  if (q) {
    url += `/search?q=${encodeURIComponent(q)}`;
  } else if (category) {
    url += `/category/${encodeURIComponent(category)}`;
  }

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }
  const data = await res.json();
  return data.products;
}

export async function fetchCategories(): Promise<string[]> {
  const res = await fetch('https://dummyjson.com/products/categories');
  if (!res.ok) {
    throw new Error('Failed to fetch categories');
  }
  return res.json();
}
