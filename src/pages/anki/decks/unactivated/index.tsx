import React, { useEffect } from 'react';
import { connect, ConnectProps, useIntl } from 'umi';
import DeckThumbnail from '../components/DeckThumbnail';
import NewDeck from '../components/NewDeck';
import { StateType, Deck } from '../model';

export interface UnactivatedDecksProps extends ConnectProps {
  decks: Deck[];
}

const UnactivatedDecks: React.FC<UnactivatedDecksProps> = props => {
  const { dispatch, decks } = props;
  const { formatMessage } = useIntl();

  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'decks/fetchDecks',
        payload: {
          status: 'unactivated',

          formatMessage,
        },
      });
    }
  }, []);

  return (
    <>
      <NewDeck />
      {decks.map(deck => (
        <DeckThumbnail deck={deck} key={deck.deckId} />
      ))}
    </>
  );
};

export default connect(({ decks }: { decks: StateType }) => ({
  decks: decks.decks,
}))(UnactivatedDecks);
