import React, { useEffect } from 'react';
import MainSearch from '../components/MainSearch';
import { useIntl, connect, ConnectProps } from 'umi';
import NewDeck from './components/NewDeck';
import { StateType, Deck } from './model';

import styles from './style.less';

interface AnkiDecksProps extends ConnectProps {
  decks: StateType;
  newDeckCreating: boolean;
}

const AnkiDecks: React.FC<AnkiDecksProps> = props => {
  const { formatMessage } = useIntl();
  const { dispatch, newDeckCreating } = props;

  const handleSearch = (value: string) => {
    console.log(value);
  };

  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'decks/fetchDecks',
        payload: {
          formatMessage,
        },
      });
    }
  }, []);

  return (
    <div className={styles.wrapper}>
      <MainSearch
        placeholder={formatMessage({
          id: 'anki.search.deck.placeholder',
        })}
        onSearch={handleSearch}
      />
      <div className={styles.content}>
        <NewDeck dispatch={dispatch} creating={newDeckCreating} />
      </div>
    </div>
  );
};

export default connect(
  ({
    decks,
    loading,
  }: {
    decks: StateType;
    loading: {
      effects: {
        [key: string]: boolean;
      };
    };
  }) => ({
    decks,
    newDeckCreating: loading.effects['decks/addDeck'],
  }),
)(AnkiDecks);
