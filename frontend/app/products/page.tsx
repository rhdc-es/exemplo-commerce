'use client';

import { useEffect, useState } from 'react';
import { Grid, Card, CardContent, CardActions, CardMedia, Typography, Button, TextField, Stack } from '@mui/material';
import { fetchProducts, Product } from '../../services/productService';
import { useCart } from '../../context/CartContext';

export default function ProductsPage() {
  const { addItem } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [searchInput, setSearchInput] = useState('');
  const [q, setQ] = useState<string | undefined>();
  const [skip, setSkip] = useState(0);
  const limit = 12;

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchProducts({ q, limit, skip });
        setProducts(data.products);
        setTotal(data.total);
      } catch {
        setProducts([]);
        setTotal(0);
      }
    };
    load();
  }, [q, limit, skip]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setQ(searchInput.trim() || undefined);
    setSkip(0);
  };

  const handleAddToCart = (product: Product) => {
    addItem({ id: String(product.id), title: product.title, price: product.price, thumbnail: product.thumbnail });
  };

  const canPrev = skip > 0;
  const canNext = skip + limit < total;

  return (
    <Stack spacing={2} sx={{ p: 4 }}>
      <form onSubmit={handleSearch}>
        <TextField
          placeholder="Buscar produtos"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          fullWidth
        />
      </form>

      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={product.thumbnail}
                alt={product.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {product.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ${product.price}
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
        <Button onClick={() => setSkip(skip - limit)} disabled={!canPrev}>
          Anterior
        </Button>
        <Button onClick={() => setSkip(skip + limit)} disabled={!canNext}>
          Próximo
        </Button>
      </Stack>
    </Stack>
  );
}

