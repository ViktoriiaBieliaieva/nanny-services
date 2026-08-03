import Header from '@/components/Header/Header';
import css from './page.module.css';
import Link from 'next/link';
import { GoArrowUpRight } from 'react-icons/go';
import { FaCheck } from 'react-icons/fa';
import { GoArrowRight } from 'react-icons/go';

const Home = () => {
  return (
    <>
      <main>
        <section className={css.section}>
          <div className={css.container}>
            <Header></Header>
            <div className={css.textWrapper}>
              <h1 className={css.title}>Make Life Easier for the Family:</h1>
              <p className={css.description}>Find Babysitters Online for All Occasions</p>
              <Link className={css.link} href={'/nannies'}>
                Get started <GoArrowUpRight className={css.iconDefault} strokeWidth={1.2} />
                <GoArrowRight className={css.iconHover} strokeWidth={1.2} />
              </Link>
            </div>
            <div className={css.imageWrapper}>
              <div className={css.experience}>
                <div className={css.square}>
                  <FaCheck size={20} color="#fbfbfb" />
                </div>
                <div className={css.experienceWrapper}>
                  <p className={css.experienceText}>Experienced nannies</p>
                  <p className={css.experienceNumber}>15,000</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
