import React from 'react';
import MainSearch from '../components/MainSearch';
import { useIntl } from 'umi';
import NewCard from './components/NewCard';

import styles from './style.less';

interface AnkiDeckProps {}

const AnkiDeck: React.FC<AnkiDeckProps> = props => {
  const { formatMessage } = useIntl();

  const handleSearch = (value: string) => {
    console.log(value);
  };
  return (
    <div className={styles.wrapper}>
      <MainSearch
        placeholder={formatMessage({ id: 'anki.search.card.placeholder' })}
        onSearch={handleSearch}
      />
      <div className={styles.content}>
        <div className={styles.filter}></div>
        <div className={styles.cards}>
          <NewCard />
        </div>
      </div>
    </div>
  );
};

export default AnkiDeck;
