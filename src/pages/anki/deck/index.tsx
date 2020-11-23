import React from 'react';
import MainSearch from '../components/MainSearch';
import { useIntl } from 'umi';
import NewCard from './components/NewCard';

import styles from './style.less';

interface AnkiDeckProps {}

const AnkiDeck: React.FC<AnkiDeckProps> = props => {
  const { formatMessage } = useIntl();

  return (
    <div className={styles.wrapper}>
      <MainSearch placeholder={} />
    </div>
  );
};

export default AnkiDeck;
