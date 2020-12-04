import React, { useEffect } from 'react';
import { connect, ConnectProps } from 'umi';
import NewCard from '../../deck/components/NewCard';
import DeckThumbnail from '../components/DeckThumbnail';
import NewDeck from '../components/NewDeck';
import { StateType } from '../model';

export interface AllDecksProps extends ConnectProps {}

const AllDecks: React.FC<AllDecksProps> = props => {
  return (
    <>
      <NewDeck />
      {}
    </>
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
    decks: decks.decks,
    fetching: loading.effects['decks/fetchDecks'],
  }),
)(AllDecks);
