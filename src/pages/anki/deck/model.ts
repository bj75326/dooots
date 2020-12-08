import { Effect, Reducer } from 'umi';
import { message, notification } from 'antd';
import { Deck as DeckForDecksPage } from '../decks/model';

import {} from './service';

export interface Card {
  cardId: string;
  deckId: string;
  cardName: string;
  tags?: string[];
  status: 'overdue' | 'today' | 'underway' | 'unactivated';
  createTimestamp: number;
  updateTimestamp?: number;
  stick: boolean;
  stickTimestamp?: number;
  author?: string;
}

interface Deck extends DeckForDecksPage {
  cards: Card[];
}

export interface StateType {
  deck?: Deck;
  eof: boolean;
}

export interface ModelType {
  namespace: 'deck';
  state: StateType;
  effects: {};
  reducers: {};
}

const Model: ModelType = {
  namespace: 'deck',
  state: {
    deck: undefined,
    eof: true,
  },
  effects: {},
  reducers: {},
};

export default Model;
