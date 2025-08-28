'use client';

import { useEffect, useState } from 'react';
import {
  Button,
  TextField,
  Stack,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Box,
} from '@mui/material';
import ProductCard from '../../components/ProductCard';
import { fetchProducts, fetchCategories, Product } from '../../services/productService';
import { useCart } from '../../context/CartContext';

export default function ProductsPage() {
  const { addItem } = useCart();

  // dados
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);

  // filtros
  const [searchInput, setSearchInput] = useState('');
  const [q, setQ] = useState<string | undefined>();
  const [category, setCategory] = useState<string | undefined>();
  const [categories, setCategories] = useState<string[]>([]);

  // paginação
  const [skip, setSkip] = useState(0);
  const limit = 10;
  const [hovered, setHovered] = useState<number | null>(null);

  // carregar produtos
  useEffect(() => {
    let isActive = true;
    (async () => {
      try {
        const data = await fetchProducts({ q, category, limit, skip });
        if (!isActive) return;
        setProducts(data.products);
        setTotal(data.total);
      } catch {
        if (!isActive) return;
        setProducts([]);
        setTotal(0);
      }
    })();
    return () => {
      isActive = false;
    };
  }, [q, category, limit, skip]);

  // carregar categorias
  useEffect(() => {
    (async () => {
      try {
        const cats = await fetchCategories();
        setCategories(cats);
      } catch {
        setCategories([]);
      }
    })();
  }, []);

  // busca por submit (pra não refetchar a cada tecla)
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setQ(searchInput.trim() || undefined);
    setSkip(0);
  };

  // trocar categoria
  const handleChangeCategory = (value: string) => {
    setCategory(value || undefined);
    setSkip(0);
  };

  // carrinho
  const handleAddToCart = (product: Product) => {
    addItem({
      id: String(product.id),
      title: product.title,
      price: product.price,
      thumbnail: product.thumbnail,
    });
  };

  const canPrev = skip > 0;
  const canNext = skip + limit < total;

  return (
    <Stack spacing={2} sx={{ p: 4 }}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        component="form"
        onSubmit={handleSearch}
      >
        <TextField
          placeholder="Buscar produtos"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          fullWidth
        />
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel id="category-label">Categoria</InputLabel>
          <Select
            labelId="category-label"
            label="Categoria"
            value={category ?? ''}
            onChange={(e) => handleChangeCategory(e.target.value as string)}
          >
            <MenuItem value="">
              <em>Todas</em>
            </MenuItem>
            {categories.map((c) => (
              <MenuItem key={c} value={c}>
                {c}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button type="submit" variant="contained">
          Buscar
        </Button>
      </Stack>

      <Box
        sx={{
          display: 'grid',
          gap: { xs: 2, md: 3 },
          gridTemplateColumns: {
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
            lg: 'repeat(4, 1fr)',
            xl: 'repeat(5, 1fr)',
          },
        }}
      >
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            hovered={hovered}
            setHovered={setHovered}
            onAddToCart={handleAddToCart}
          />
        ))}
      </Box>

      <Stack direction="row" spacing={2} justifyContent="center">
        <Button onClick={() => setSkip((s) => Math.max(0, s - limit))} disabled={!canPrev}>
          Anterior
        </Button>
        <Button onClick={() => setSkip((s) => s + limit)} disabled={!canNext}>
          Próximo
        </Button>
      </Stack>
    </Stack>
  );
}
