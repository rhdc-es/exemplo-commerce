'use client';

import { useEffect, useState } from 'react';
import { Typography, Pagination, Toolbar, Box } from '@mui/material';
import Header from '../../components/Header';
import { useAuth } from '../../context/AuthContext';
import { withAuth } from '../../components/withAuth';
import { useCart } from '../../context/CartContext';
import { fetchProducts, type Product } from '../../services/productService';
import ProductCard from '../../components/ProductCard';

function DashboardPage() {
  const { user } = useAuth();
  const { addItem } = useCart();

  const [page, setPage] = useState(0);
  const [pageSize] = useState(10);
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    (async () => {
      const data = await fetchProducts({ limit: pageSize, skip: page * pageSize });
      setProducts(data.products);
      setTotal(data.total);
    })();
  }, [page, pageSize]);

  const pageCount = Math.ceil(total / pageSize);

  const handleAddToCart = (product: Product) => {
    // CartContext espera Product completo
    addItem(product);
  };

  return (
    <div>
      <Header />
      <Toolbar />

      <Typography variant="h4" sx={{ mt: 4, textAlign: 'center' }}>
        Bem-vindo, {user.name}
      </Typography>

      <Box
        sx={{
          p: 4,
          display: 'grid',
          gap: { xs: 2, md: 3 },
          gridTemplateColumns: '1fr',
          containerType: 'inline-size',
          '@container (min-width: 600px)': { gridTemplateColumns: 'repeat(2, 1fr)' },
          '@container (min-width: 900px)': { gridTemplateColumns: 'repeat(3, 1fr)' },
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

      <Pagination
        count={pageCount}
        page={page + 1}
        onChange={(_, value) => setPage(value - 1)}
        sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}
      />
    </div>
  );
}

export default withAuth(DashboardPage);
