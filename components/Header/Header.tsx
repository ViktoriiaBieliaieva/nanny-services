'use client';

import Link from 'next/link';
import css from './Header.module.css';
import AuthNavigation from '../AuthNavigation/AuthNavigation';
import { useState } from 'react';
import Modal from '../Modal/Modal';
import LoginForm from '../LoginForm/LoginForm';
import RegisterForm from '../RegisterForm/RegisterForm';

const Header = () => {
  const [authModal, setAuthModal] = useState<'login' | 'register' | null>(null);
  return (
    <>
      <header className={css.header}>
        <Link href="/" aria-label="Home" className={css.headerLink}>
          Nanny.Services
        </Link>
        <nav aria-label="Main Navigation" className={css.navigation}>
          <ul className={css.menuGroup}>
            <li className={css.menuItem}>
              <Link className={css.menuLink} href="/">
                Home
              </Link>
            </li>
            <li className={css.menuItem}>
              <Link className={css.menuLink} href="/nannies">
                Nannies
              </Link>
            </li>
          </ul>
          <AuthNavigation
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
