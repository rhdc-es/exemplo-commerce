'use client';

import { ComponentType, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';

export function withAuth<P>(Component: ComponentType<P>) {
  return function Wrapped(props: P) {
    const { user } = useAuth();
    const router = useRouter();
    useEffect(() => {
      if (!user) {
        router.replace('/login');
      }
    }, [user, router]);
    if (!user) return null;
    return <Component {...props} />;
  };
}

export function withGuest<P>(Component: ComponentType<P>) {
  return function Wrapped(props: P) {
    const { user } = useAuth();
    const router = useRouter();
    useEffect(() => {
      if (user) {
        router.replace('/dashboard');
      }
    }, [user, router]);
    if (user) return null;
    return <Component {...props} />;
  };
}
