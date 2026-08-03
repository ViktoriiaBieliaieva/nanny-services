'use client';

import { useEffect } from 'react';
import { subscribeToAuthState } from '@/lib/auth';
import { useAuthStore } from '@/lib/store/authStore';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const setUser = useAuthStore(state => state.setUser);
  const clearUser = useAuthStore(state => state.clearIsAuthenticated);

  useEffect(() => {
    const unsubscribe = subscribeToAuthState(firebaseUser => {
      if (firebaseUser) {
        setUser({
          uid: firebaseUser.uid,
          username: firebaseUser.displayName || '',
          email: firebaseUser.email || '',
        });
      } else {
        clearUser();
      }
    });

    return () => unsubscribe();
  }, [setUser, clearUser]);

  return children;
}
