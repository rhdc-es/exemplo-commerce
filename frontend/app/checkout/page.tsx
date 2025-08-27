'use client';

import { useState } from 'react';
import { Button, List, ListItem, ListItemText, Snackbar, Alert, Typography, Stack } from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import { withAuth } from '../../components/withAuth';
import * as orderService from '../../services/orderService';
import { useCart } from '../../context/CartContext';

function CheckoutPage() {
  const { user } = useAuth();
  const { items, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [snack, setSnack] = useState<{open: boolean; message: string; severity: 'success' | 'error'} | null>(null);

  const handleCheckout = async () => {
    if (!user) return;
    setLoading(true);
    try {
      await orderService.createOrder({
        userId: Number(user.id),
        products: items.map(i => ({ id: i.product.id, quantity: i.quantity }))
      });
      clearCart();
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
            {items.map(({ product, quantity }) => (
              <ListItem key={product.id}>
                <ListItemText
                  primary={`${product.title} x${quantity}`}
                  secondary={`$${product.price}`}
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

