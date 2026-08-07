'use client';

import css from './AuthNavigation.module.css';
import { useAuthStore } from '@/lib/store/authStore';
import { useRouter } from 'next/navigation';
import { logoutUser } from '@/lib/auth';
import clsx from 'clsx';
import { IoPerson } from 'react-icons/io5';

interface AuthNavigationProps {
  onLoginClick: () => void;
  onRegisterClick: () => void;
  isInnerPage?: boolean;
}

export default function AuthNavigation({
  onLoginClick,
  onRegisterClick,
  isInnerPage = false,
}: AuthNavigationProps) {
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
            <div className={css.square}>
              <IoPerson color="#f03f3b"></IoPerson>
            </div>
            <p className={css.name}>{user?.username}</p>
          </li>

          <li>
            <button onClick={handleLogout} className={clsx(css.navigationButton, css.loginButton)}>
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
            <button
              className={clsx(css.navigationButton, css.regButton, isInnerPage && css.innerButton)}
              onClick={onRegisterClick}
            >
              Registration
            </button>
          </li>
        </ul>
      )}
    </>
  );
}
