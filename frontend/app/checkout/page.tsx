'use client';

import { useEffect, useState } from 'react';
import { Button, List, ListItem, ListItemText, Snackbar, Alert, Typography, Stack } from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import { withAuth } from '../../components/withAuth';
import * as orderService from '../../services/orderService';

interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
}

function CheckoutPage() {
  const { user } = useAuth();
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [snack, setSnack] = useState<{open: boolean; message: string; severity: 'success' | 'error'} | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('cart');
      if (stored) {
        try {
          setItems(JSON.parse(stored));
        } catch {
          setItems([]);
        }
      }
    }
  }, []);

  const handleCheckout = async () => {
    if (!user) return;
    setLoading(true);
    try {
      await orderService.createOrder({
        userId: Number(user.id),
        products: items.map(i => ({ id: i.id, quantity: i.quantity }))
      });
      if (typeof window !== 'undefined') {
        localStorage.removeItem('cart');
      }
      setItems([]);
      setSnack({ open: true, message: 'Pedido realizado com sucesso', severity: 'success' });
    } catch {
      setSnack({ open: true, message: 'Erro ao finalizar pedido', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack spacing={2} sx={{ p: 4 }}>
      <Typography variant="h4">Checkout</Typography>
      {items.length === 0 ? (
        <Typography>Seu carrinho está vazio.</Typography>
      ) : (
        <>
          <List>
            {items.map(item => (
              <ListItem key={item.id}>
                <ListItemText
                  primary={`${item.title} x${item.quantity}`}
                  secondary={`$${item.price}`}
                />
              </ListItem>
            ))}
          </List>
          <Button variant="contained" onClick={handleCheckout} disabled={loading}>
            {loading ? 'Enviando...' : 'Finalizar Compra'}
          </Button>
        </>
      )}
      <Snackbar open={snack?.open || false} autoHideDuration={4000} onClose={() => setSnack(null)}>
        {snack && <Alert severity={snack.severity}>{snack.message}</Alert>}
      </Snackbar>
    </Stack>
  );
}

export default withAuth(CheckoutPage);

