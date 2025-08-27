'use client';

import { useEffect, useState } from 'react';
import {
  Grid,
  TextField,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  CardActions
} from '@mui/material';
import { fetchProducts, fetchCategories, Product } from '../../services/productService';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const load = async () => {
      const prods = await fetchProducts({ q: search, category });
      setProducts(prods);
    };
    load();
  }, [search, category]);

  useEffect(() => {
    const loadCategories = async () => {
      const cats = await fetchCategories();
      setCategories(cats);
    };
    loadCategories();
  }, []);

  return (
    <div>
      <TextField
        label="Buscar"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 2, mr: 2 }}
      />
      <FormControl sx={{ minWidth: 200, mb: 2 }}>
        <InputLabel id="category-label">Categoria</InputLabel>
        <Select
          labelId="category-label"
          label="Categoria"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
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
                <Button size="small" variant="contained">Adicionar</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
