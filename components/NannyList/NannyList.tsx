import { Nanny } from '@/types/nanny';
import css from './NannyList.module.css';
import NannyCard from '../NannyCard/NannyCard';

type NannyListProps = {
  nannies: Nanny[];
};

const NannyList = ({ nannies }: NannyListProps) => {
  return (
    <ul className={css.list}>
      {nannies.map(nanny => {
        return <NannyCard item={nanny} key={nanny.id} />;
      })}
    </ul>
  );
};

export default NannyList;
