import React, { useEffect } from 'react';
import MainSearch from '../components/MainSearch';
import { useIntl, connect, ConnectProps } from 'umi';
import NewDeck from './components/NewDeck';
import { StateType, Deck } from './model';
import { Spin } from 'antd';
import DeckThumbnail from './components/DeckThumbnail';
import { SettingModelState } from '@/models/settings';

import styles from './style.less';

interface AnkiDecksProps extends ConnectProps {
  decks: Deck[];
  newDeckCreating: boolean;
  fetchingDecks: boolean;
  theme: SettingModelState['theme'];
}

const AnkiDecks: React.FC<AnkiDecksProps> = props => {
  const { formatMessage } = useIntl();
  const { dispatch, newDeckCreating, fetchingDecks, decks, theme } = props;

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
    <Spin spinning={fetchingDecks} size="large">
      <div className={styles.wrapper}>
        <MainSearch
          placeholder={formatMessage({
            id: 'anki.search.deck.placeholder',
          })}
          onSearch={handleSearch}
        />
        <div className={styles.content}>
          <NewDeck dispatch={dispatch} creating={newDeckCreating} />
          {decks.map((deck, index) => (
            <DeckThumbnail deck={deck} key={deck.deckId} theme={theme} />
          ))}
          {new Array(10).fill(null).map((_, index) => (
            <div className={styles.fill} key={`fill_${index}`}></div>
          ))}
        </div>
      </div>
    </Spin>
  );
};

export default connect(
  ({
    decks,
    loading,
    settings,
  }: {
    decks: StateType;
    settings: SettingModelState;
    loading: {
      effects: {
        [key: string]: boolean;
      };
    };
  }) => ({
    decks: decks.decks,
    theme: settings.theme,
    newDeckCreating: loading.effects['decks/addDeck'],
    fetchingDecks: loading.effects['decks/fetchDecks'],
  }),
)(AnkiDecks);
