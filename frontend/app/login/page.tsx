'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextField, Button, Snackbar, Alert, Link, Stack } from '@mui/material';
import NextLink from 'next/link';
import { useState } from 'react';
import PasswordField from '../../components/PasswordField';
import AuthCard from '../../components/AuthCard';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import { withGuest } from '../../components/withAuth';

type FormData = z.infer<typeof schema>;

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1)
});

function LoginPage() {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<FormData>({ resolver: zodResolver(schema) });
  const [snack, setSnack] = useState<{open: boolean; message: string; severity: 'success' | 'error'} | null>(null);
  const { signIn } = useAuth();
  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    try {
      await signIn(data.email, data.password);
      setSnack({ open: true, message: 'Login realizado', severity: 'success' });
      router.replace('/dashboard');
    } catch (e: any) {
      setSnack({ open: true, message: e.message, severity: 'error' });
    }
  };

  return (
    <AuthCard title="Login">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <TextField label="Email" {...register('email')} />
          <PasswordField label="Senha" {...register('password')} />
          <Button type="submit" variant="contained" disabled={isSubmitting}>
            {isSubmitting ? 'Entrando...' : 'Entrar'}
          </Button>
          <Link component={NextLink} href="/signup" underline="hover">Criar conta</Link>
        </Stack>
      </form>
      <Snackbar open={snack?.open || false} autoHideDuration={4000} onClose={() => setSnack(null)}>
        {snack && <Alert severity={snack.severity}>{snack.message}</Alert>}
      </Snackbar>
    </AuthCard>
  );
}

export default withGuest(LoginPage);
