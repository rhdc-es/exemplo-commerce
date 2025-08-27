'use client';

import { AppBar, Toolbar, Typography, Button, Pagination } from '@mui/material';
import ThemeToggle from '../../components/ThemeToggle';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import { withAuth } from '../../components/withAuth';
import { useEffect, useState } from 'react';
import { listProducts, Product } from '../../services/productService';

function DashboardPage() {
  const { user, signOut } = useAuth();
  const router = useRouter();

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    listProducts(pageSize, page * pageSize).then((data) => {
      setProducts(data.products);
      setTotal(data.total);
    });
  }, [page, pageSize]);

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
