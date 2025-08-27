'use client';

import { AppBar, Toolbar, Typography, IconButton, InputBase, Box } from '@mui/material';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import ThemeToggle from './ThemeToggle';
import Link from 'next/link';
import { alpha, styled, useTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AppBar
      position="fixed"
      elevation={scrolled ? 4 : 0}
      color="transparent"
      sx={{
        transition: 'background-color 0.3s, backdrop-filter 0.3s',
        backgroundColor: scrolled
          ? theme.palette.mode === 'light'
            ? 'rgba(255,255,255,0.7)'
            : 'rgba(0,0,0,0.7)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(10px)' : 'none',
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          href="/"
          sx={{ textDecoration: 'none', color: 'inherit', flexGrow: { xs: 0, sm: 1 } }}
        >
          Exemplo Commerce
        </Typography>
        <Box sx={{ flexGrow: 1, mx: 2, display: { xs: 'none', sm: 'block' } }}>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase placeholder="Buscar…" inputProps={{ 'aria-label': 'search' }} />
          </Search>
        </Box>
        <IconButton color="inherit" href="/checkout" sx={{ mr: 1 }}>
          <ShoppingCart />
        </IconButton>
        <ThemeToggle />
      </Toolbar>
    </AppBar>
  );
}

