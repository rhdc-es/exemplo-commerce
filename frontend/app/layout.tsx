import Providers from './providers';
import { CartProvider } from '../context/CartContext';
import Header from '../components/Header';
import "./globals.css";
import type { ReactNode } from 'react';

export const metadata = {
  title: 'Exemplo Commerce'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <Header />
        <CartProvider>
          <Providers>{children}</Providers>
        </CartProvider>
      </body>
    </html>
  );
}
