import Providers from './providers';
import { CartProvider } from '../context/CartContext';
import "./globals.css";
import type { ReactNode } from 'react';

export const metadata = {
  title: 'Exemplo Commerce'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <CartProvider>
          <Providers>{children}</Providers>
        </CartProvider>
      </body>
    </html>
  );
}
