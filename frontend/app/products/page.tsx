'use client';

import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Stack,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Box,
  Rating,
  Zoom,
} from '@mui/material';
import Image from 'next/image';
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
  const limit = 12;
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
          gridTemplateColumns: '1fr',
          containerType: 'inline-size',
          '@container (min-width: 600px)': {
            gridTemplateColumns: 'repeat(2, 1fr)',
          },
          '@container (min-width: 900px)': {
            gridTemplateColumns: 'repeat(3, 1fr)',
          },
        }}
      >
        {products.map((product) => (
          <Card
            key={product.id}
            onMouseEnter={() => setHovered(product.id)}
            onMouseLeave={() => setHovered(null)}
            sx={{
              position: 'relative',
              overflow: 'hidden',
              transition: 'transform 0.3s, box-shadow 0.3s',
              boxShadow: hovered === product.id ? 6 : 1,
              transform: hovered === product.id ? 'translateY(-4px)' : 'none',
            }}
          >
            <Box sx={{ position: 'relative', aspectRatio: '4/3' }}>
              <Image src={product.thumbnail} alt={product.title} fill style={{ objectFit: 'cover' }} />
              <Box
                sx={{
                  position: 'absolute',
                  top: 8,
                  left: 8,
                  bgcolor: 'primary.main',
                  color: 'primary.contrastText',
                  px: 1,
                  py: 0.5,
                  borderRadius: 1,
                  fontWeight: 'bold',
                }}
              >
                {`$${product.price}`}
              </Box>
            </Box>
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                {product.title}
              </Typography>
              <Rating value={product.rating} precision={0.1} readOnly size="small" />
            </CardContent>
            <Zoom in={hovered === product.id} unmountOnExit>
              <Button
                size="small"
                variant="contained"
                onClick={() => handleAddToCart(product)}
                sx={{ position: 'absolute', bottom: 16, right: 16 }}
              >
                Adicionar ao carrinho
              </Button>
            </Zoom>
          </Card>
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
