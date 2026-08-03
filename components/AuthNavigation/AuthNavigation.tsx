'use client';

import css from './AuthNavigation.module.css';
import { useAuthStore } from '@/lib/store/authStore';
import { useRouter } from 'next/navigation';
import { logoutUser } from '@/lib/auth';
import clsx from 'clsx';

interface AuthNavigationProps {
  onLoginClick: () => void;
  onRegisterClick: () => void;
}

export default function AuthNavigation({ onLoginClick, onRegisterClick }: AuthNavigationProps) {
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();
  const clearIsAuthenticated = useAuthStore(state => state.clearIsAuthenticated);
  const handleLogout = async () => {
    await logoutUser();
    clearIsAuthenticated();
    router.push('/');
  };
  return (
    <>
      {isAuthenticated ? (
        <ul className={css.loggedGroup}>
          <li className={css.loggedItem}>
            <p>{user?.username}</p>
          </li>

          <li className={css.loggedItem}>
            <button onClick={handleLogout} className={css.logoutButton}>
              Log out
            </button>
          </li>
        </ul>
      ) : (
        <ul className={css.authGroup}>
          <li className={css.authItem}>
            <button className={clsx(css.navigationButton, css.loginButton)} onClick={onLoginClick}>
              Log In
            </button>
          </li>

          <li className={css.authItem}>
            <button className={clsx(css.navigationButton, css.regButton)} onClick={onRegisterClick}>
              Registration
            </button>
          </li>
        </ul>
      )}
    </>
  );
}
