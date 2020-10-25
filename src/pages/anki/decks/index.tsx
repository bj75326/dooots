import React from 'react';
import MainSearch from '../components/MainSearch';
import { useIntl, connect, ConnectProps } from 'umi';
import NewDeck from './components/NewDeck';
import { ConnectState } from '@/models/connect';

import styles from './style.less';

interface AnkiDecksProps extends ConnectProps {
  primaryColor: ConnectState['settings']['primaryColor'];
}

const AnkiDecks: React.FC<AnkiDecksProps> = props => {
  const { formatMessage } = useIntl();

  const handleSearch = (value: string) => {
    console.log(value);
  };

  return (
    <div className={styles.wrapper}>
      <MainSearch
        placeholder={formatMessage({
          id: 'anki.search.deck.placeholder',
        })}
        onSearch={handleSearch}
      />
      <div className={styles.content}>
        <NewDeck />
      </div>
    </div>
  );
};

export default connect(({ settings }: ConnectState) => ({}))(AnkiDecks);
