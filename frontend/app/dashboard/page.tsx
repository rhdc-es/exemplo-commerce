'use client';

import { Typography, Pagination, Toolbar } from '@mui/material';
import Header from '../../components/Header';
import { useAuth } from '../../context/AuthContext';
import { withAuth } from '../../components/withAuth';
import { useEffect, useState } from 'react';
import { fetchProducts, Product } from '../../services/productService';

function DashboardPage() {
  const { user } = useAuth();

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchProducts({ limit: pageSize, skip: page * pageSize }).then((data) => {
      setProducts(data.products);
      setTotal(data.total);
    });
  }, [page, pageSize]);

  const pageCount = Math.ceil(total / pageSize);

  return (
    <div>
      <Header />
      <Toolbar />
      <Typography variant="h4" sx={{ mt: 4, textAlign: 'center' }}>
        Bem-vindo, {user.name}
      </Typography>
      {products.map((product) => (
        <Typography key={product.id} sx={{ mt: 2, textAlign: 'center' }}>
          {product.title}
        </Typography>
      ))}
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
