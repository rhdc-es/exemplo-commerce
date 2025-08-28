'use client';

import { AppBar, Toolbar, Typography, Button, Pagination, Box } from '@mui/material';
import ThemeToggle from '../../components/ThemeToggle';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useRouter } from 'next/navigation';
import { withAuth } from '../../components/withAuth';
import { useEffect, useState } from 'react';
import { fetchProducts, Product } from '../../services/productService';
import ProductCard from '../../components/ProductCard';

function DashboardPage() {
  const { user, signOut } = useAuth();
  const { addItem } = useCart();
  const router = useRouter();

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    fetchProducts({ limit: pageSize, skip: page * pageSize }).then((data) => {
      setProducts(data.products);
      setTotal(data.total);
    });
  }, [page, pageSize]);

  const handleAddToCart = (product: Product) => {
    addItem({
      id: String(product.id),
      title: product.title,
      price: product.price,
      thumbnail: product.thumbnail,
    });
  };

  const pageCount = Math.ceil(total / pageSize);

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Dashboard
          </Typography>
          <ThemeToggle />
          <Button
            color="inherit"
            onClick={() => {
              signOut();
              router.replace('/login');
            }}
          >
            Sair
          </Button>
        </Toolbar>
      </AppBar>
      <Typography variant="h4" sx={{ mt: 4, textAlign: 'center' }}>
        Bem-vindo, {user.name}
      </Typography>
      <Box
        sx={{
          mt: 4,
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
