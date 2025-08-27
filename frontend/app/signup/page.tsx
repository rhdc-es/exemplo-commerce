'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextField, Button, Snackbar, Alert, Link, Stack } from '@mui/material';
import NextLink from 'next/link';
import { useState } from 'react';
import PasswordField from '../../components/PasswordField';
import AuthCard from '../../components/AuthCard';
import { useRouter } from 'next/navigation';
import * as authService from '../../services/authService';
import { withGuest } from '../../components/withAuth';

type FormData = z.infer<typeof schema>;

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
  confirmPassword: z.string().min(6)
}).refine(data => data.password === data.confirmPassword, {
  message: 'Senhas diferentes',
  path: ['confirmPassword']
});

function SignupPage() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({ resolver: zodResolver(schema) });
  const [snack, setSnack] = useState<{open: boolean; message: string; severity: 'success' | 'error'} | null>(null);
  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    try {
      await authService.signUp({ name: data.name, email: data.email, password: data.password });
      setSnack({ open: true, message: 'Cadastro realizado', severity: 'success' });
      router.replace('/login');
    } catch (e: any) {
      setSnack({ open: true, message: e.message, severity: 'error' });
    }
  };

  return (
    <AuthCard title="Cadastro">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <TextField
            label="Nome"
            error={!!errors.name}
            helperText={errors.name?.message}
            {...register('name')}
          />
          <TextField
            label="Email"
            error={!!errors.email}
            helperText={errors.email?.message}
            {...register('email')}
          />
          <PasswordField
            label="Senha"
            error={!!errors.password}
            helperText={errors.password?.message}
            {...register('password')}
          />
          <PasswordField
            label="Confirmar senha"
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
            {...register('confirmPassword')}
          />
          <Button type="submit" variant="contained" disabled={isSubmitting}>
            {isSubmitting ? 'Enviando...' : 'Cadastrar'}
          </Button>
          <Link component={NextLink} href="/login" underline="hover">Já tenho conta</Link>
        </Stack>
      </form>
      <Snackbar open={snack?.open || false} autoHideDuration={4000} onClose={() => setSnack(null)}>
        {snack && <Alert severity={snack.severity}>{snack.message}</Alert>}
      </Snackbar>
    </AuthCard>
  );
}

export default withGuest(SignupPage);
