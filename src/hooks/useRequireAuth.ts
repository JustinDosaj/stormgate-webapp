// hooks/useRequireAuth.ts
import { useRouter } from 'next/router';
import { useAuth } from '@/context/AuthContext';
import { useEffect } from 'react';

export const useRequireAuth = () => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
        //router.push(`/auth/login?redirect=${router.pathname}`);
    }
  }, [user, router]);

  return user;
};
