'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import css from './Header.module.css';
import AuthNavigation from '../AuthNavigation/AuthNavigation';
import { useState } from 'react';
import Modal from '../Modal/Modal';
import LoginForm from '../LoginForm/LoginForm';
import RegisterForm from '../RegisterForm/RegisterForm';
import { useAuthStore } from '@/lib/store/authStore';

const Header = () => {
  const [authModal, setAuthModal] = useState<'login' | 'register' | null>(null);
  const { isAuthenticated } = useAuthStore();
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  return (
    <>
      <header className={clsx(css.header, isHomePage ? css.homeHeader : css.innerHeader)}>
        <Link href="/" aria-label="Home" className={css.headerLink}>
          Nanny.Services
        </Link>
        <nav aria-label="Main Navigation" className={css.navigation}>
          <ul className={css.menuGroup}>
            <li className={css.menuItem}>
              <Link className={clsx(css.menuLink, pathname === '/' && css.active)} href="/">
                Home
              </Link>
            </li>
            <li className={css.menuItem}>
              <Link
                className={clsx(css.menuLink, pathname === '/nannies' && css.active)}
                href="/nannies"
              >
                Nannies
              </Link>
            </li>
            {isAuthenticated && (
              <li className={css.menuItem}>
                <Link
                  className={clsx(css.menuLink, pathname === '/favorites' && css.active)}
                  href="/favorites"
                >
                  Favorites
                </Link>
              </li>
            )}
          </ul>
          <AuthNavigation
            isInnerPage={!isHomePage}
            onLoginClick={() => setAuthModal('login')}
            onRegisterClick={() => setAuthModal('register')}
          />
        </nav>
      </header>
      {authModal === 'login' && (
        <Modal onClose={() => setAuthModal(null)}>
          <LoginForm onSuccess={() => setAuthModal(null)} />
        </Modal>
      )}
      {authModal === 'register' && (
        <Modal onClose={() => setAuthModal(null)}>
          <RegisterForm onSuccess={() => setAuthModal(null)} />
        </Modal>
      )}
    </>
  );
};

export default Header;
