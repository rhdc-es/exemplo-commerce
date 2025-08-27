'use client';

import { useEffect, useState } from 'react';
import {
  Grid,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Typography,
  Button,
  TextField,
  Stack,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material';
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

      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card>
              <CardMedia component="img" height="140" image={product.thumbnail} alt={product.title} />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {product.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {`$${product.price}`}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" variant="contained" onClick={() => handleAddToCart(product)}>
                  Adicionar ao carrinho
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

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
