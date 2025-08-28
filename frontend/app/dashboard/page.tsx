'use client';

import { useEffect, useState } from 'react';
import {
  Typography,
  Pagination,
  Toolbar,
  Card,
  CardContent,
  Button,
  Box,
  Rating,
  Zoom,
} from '@mui/material';
import Image from 'next/image';
import Header from '../../components/Header';
import { useAuth } from '../../context/AuthContext';
import { withAuth } from '../../components/withAuth';
import { useCart } from '../../context/CartContext';
import { fetchProducts, type Product } from '../../services/productService';

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
            <Box sx={{ position: 'relative', aspectRatio: '4 / 3' }}>
              <Image
                src={product.thumbnail}
                alt={product.title}
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 900px) 100vw, 33vw"
              />
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
              <Typography gutterBottom variant="h6" component="div" noWrap>
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
