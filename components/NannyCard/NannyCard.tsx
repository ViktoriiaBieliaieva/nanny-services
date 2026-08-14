import css from './NannyCard.module.css';
import Image from 'next/image';
import { IoLocationOutline } from 'react-icons/io5';
import { FaStar } from 'react-icons/fa';
import { FaRegHeart } from 'react-icons/fa';
import { Nanny } from '@/types/nanny';
import { getAge } from '@/lib/nannies';
import { useState } from 'react';

type NannyCardProps = {
  item: Nanny;
};

const NannyCard = ({ item }: NannyCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <li className={css.item}>
      <div className={css.imgWrapper}>
        <Image
          src={item.avatar_url}
          alt={item.name}
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
              <p className={css.textDetails}>{item.location}</p>
            </div>
            <span className={css.divider} />
            <div className={css.detailGroup}>
              <FaStar color="#ffc531" className={css.icon} />
              <p className={css.textDetails}>Rating: {item.rating}</p>
            </div>
            <span className={css.divider} />
            <p className={css.textDetails}>
              Price / 1 hour: <span className={css.price}>{item.price_per_hour}$</span>
            </p>
            <FaRegHeart className={css.iconHeart} />
          </div>
        </div>
        <h3 className={css.name}>{item.name}</h3>
        <ul className={css.metaList}>
          <li className={css.metaItem}>
            Age: <span className={css.age}>{getAge(item.birthday)}</span>
          </li>
          <li className={css.metaItem}>
            Experience: <span className={css.metaSpan}>{item.experience}</span>
          </li>
          <li className={css.metaItem}>
            Kids Age: <span className={css.metaSpan}>{item.kids_age}</span>
          </li>
          <li className={css.metaItem}>
            Characters:
            <span className={css.metaSpan}>
              {item.characters.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(', ')}
            </span>
          </li>
          <li className={css.metaItem}>
            Education: <span className={css.metaSpan}>{item.education}</span>
          </li>
        </ul>
        <p className={css.about}>{item.about}</p>
        {!isExpanded && (
          <button className={css.button} onClick={() => setIsExpanded(true)}>
            Read more
          </button>
        )}
        {isExpanded && (
          <div className={css.expandedInfo}>
            <ul className={css.reviewsList}>
              {item.reviews.map(review => (
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
        )}
      </div>
    </li>
  );
};

export default NannyCard;
