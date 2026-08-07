'use client';
import Header from '@/components/Header/Header';
import { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from '@/lib/firebase';
import { NannyFromDb, Nanny } from '@/types/nanny';
import css from './Nannies.module.css';
import Image from 'next/image';
import { IoLocationOutline } from 'react-icons/io5';
import { FaStar } from 'react-icons/fa';
import { FaRegHeart } from 'react-icons/fa';

const Nannies = () => {
  const [nannies, setNannies] = useState<Nanny[]>([]);
  const [expandedNannyId, setExpandedNannyId] = useState<string | null>(null);

  useEffect(() => {
    const nanniesRef = ref(database, 'nannies');

    const unsubscribe = onValue(nanniesRef, snapshot => {
      const data = snapshot.val() as Record<string, NannyFromDb> | null;

      if (data) {
        const nanniesArray = Object.entries(data).map(([id, nanny]) => ({
          id,
          ...nanny,
        }));

        setNannies(nanniesArray);
      } else {
        setNannies([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const getAge = (birthday: string) => {
    const birthDate = new Date(birthday);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();

    const birthdayHasNotPassedYet =
      today.getMonth() < birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate());

    if (birthdayHasNotPassedYet) {
      age -= 1;
    }

    return age;
  };

  return (
    <>
      <Header></Header>
      <main>
        <section className={css.section}>
          <div className={css.container}>
            <ul className={css.list}>
              {nannies.map(nanny => {
                const isExpanded = expandedNannyId === nanny.id;
                return (
                  <li key={nanny.id} className={css.item}>
                    <div className={css.imgWrapper}>
                      <Image
                        src={nanny.avatar_url}
                        alt={nanny.name}
                        width={96}
                        height={96}
                        className={css.avatar}
                      ></Image>
                      <div className={css.circle}>
                        <div className={css.greenCircle}></div>
                      </div>
                    </div>
                    <div className={css.textWrapper}>
                      <div className={css.topRaw}>
                        <p className={css.text}>Nanny</p>
                        <div className={css.topRawDetails}>
                          <div className={css.detailGroup}>
                            <IoLocationOutline className={css.icon} />
                            <p className={css.textDetails}>{nanny.location}</p>
                          </div>
                          <span className={css.divider} />
                          <div className={css.detailGroup}>
                            <FaStar color="#ffc531" className={css.icon} />
                            <p className={css.textDetails}>Rating: {nanny.rating}</p>
                          </div>
                          <span className={css.divider} />
                          <p className={css.textDetails}>
                            Price / 1 hour:{' '}
                            <span className={css.price}>{nanny.price_per_hour}$</span>
                          </p>
                          <FaRegHeart className={css.iconHeart} />
                        </div>
                      </div>
                      <h3 className={css.name}>{nanny.name}</h3>
                      <ul className={css.metaList}>
                        <li className={css.metaItem}>
                          Age: <span className={css.age}>{getAge(nanny.birthday)}</span>
                        </li>
                        <li className={css.metaItem}>
                          Experience: <span className={css.metaSpan}>{nanny.experience}</span>
                        </li>
                        <li className={css.metaItem}>
                          Kids Age: <span className={css.metaSpan}>{nanny.kids_age}</span>
                        </li>
                        <li className={css.metaItem}>
                          Characters:
                          <span className={css.metaSpan}>
                            {nanny.characters
                              .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                              .join(', ')}
                          </span>
                        </li>
                        <li className={css.metaItem}>
                          Education: <span className={css.metaSpan}>{nanny.education}</span>
                        </li>
                      </ul>
                      <p className={css.about}>{nanny.about}</p>
                      {!isExpanded && (
                        <button className={css.button} onClick={() => setExpandedNannyId(nanny.id)}>
                          Read more
                        </button>
                      )}
                      {isExpanded && (
                        <div className={css.expandedInfo}>
                          <ul className={css.reviewsList}>
                            {nanny.reviews.map(review => (
                              <li className={css.reviewItem} key={review.reviewer}>
                                <div className={css.reviewHeader}>
                                  <div className={css.reviewAvatar}>{review.reviewer[0]}</div>
                                  <div>
                                    <p className={css.reviewerName}>{review.reviewer}</p>
                                    <p className={css.reviewRatingText}>
                                      <FaStar className={css.icon} color="#ffc531" />
                                      {review.rating}.0
                                    </p>
                                  </div>
                                </div>

                                <p className={css.reviewComment}>{review.comment}</p>
                              </li>
                            ))}
                          </ul>

                          <button className={css.appointmentButton}>Make an appointment</button>
                        </div>
                      )}{' '}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      </main>
    </>
  );
};

export default Nannies;
