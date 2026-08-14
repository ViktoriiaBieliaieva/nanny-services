'use client';
import Header from '@/components/Header/Header';
import { useEffect, useState } from 'react';
import { Nanny } from '@/types/nanny';
import css from './Nannies.module.css';
import NannyList from '@/components/NannyList/NannyList';
import { getNannies } from '@/lib/nannies';

const Nannies = () => {
  const [nannies, setNannies] = useState<Nanny[]>([]);

  useEffect(() => {
    async function loadNannies() {
      try {
        const nanniesData = await getNannies();
        setNannies(nanniesData);
      } catch (error) {
        console.error('Failed to load nannies:', error);
      }
    }
    loadNannies();
  }, []);

  return (
    <>
      <Header></Header>
      <main>
        <section className={css.section}>
          <div className={css.container}>
            <NannyList nannies={nannies} />
          </div>
        </section>
      </main>
    </>
  );
};

export default Nannies;
