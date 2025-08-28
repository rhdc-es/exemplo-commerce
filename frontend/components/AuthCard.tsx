'use client';

import { Container, Card, CardContent, Typography } from '@mui/material';
import { ReactNode } from 'react';

interface Props {
  title: string;
  children: ReactNode;
}

export default function AuthCard({ title, children }: Props) {
  return (
    <Container maxWidth="sm" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <Card sx={{ width: '100%', bgcolor: 'background.paper' }}>
        <CardContent>
          <Typography variant="h5" component="h1" gutterBottom>
            {title}
          </Typography>
          {children}
        </CardContent>
      </Card>
    </Container>
  );
}
