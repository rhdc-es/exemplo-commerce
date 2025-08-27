'use client';

import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import ThemeToggle from '../../components/ThemeToggle';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import { withAuth } from '../../components/withAuth';

function DashboardPage() {
  const { user, signOut } = useAuth();
  const router = useRouter();

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Dashboard
          </Typography>
          <ThemeToggle />
          <Button color="inherit" onClick={() => { signOut(); router.replace('/login'); }}>
            Sair
          </Button>
        </Toolbar>
      </AppBar>
      <Typography variant="h4" sx={{ mt: 4, textAlign: 'center' }}>
        Bem-vindo, {user.name}
      </Typography>
    </div>
  );
}

export default withAuth(DashboardPage);
