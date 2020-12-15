import { Effect, Reducer } from 'umi';
import { message, notification } from 'antd';
import { Deck as DeckForDecksPage } from '../decks/model';

import { getDeck, getTags, initCards } from './service';

export interface Rate {
  deckId: string;
  cardId: string;
  rateTimestamp: number;
  rate: number;
}

export interface Card {
  cardId: string;
  deckId: string;
  cardName: string;
  tags?: string[];
  status: 'overdue' | 'today' | 'underway' | 'unactivated';
  createTimestamp: number;
  updateTimestamp: number;
  stick: boolean;
  stickTimestamp?: number;
  author?: string;
  rates: Rate[];
}

export interface Deck extends DeckForDecksPage {
  //cards: Card[];
}

export interface StateType {
  deck?: Deck;
  cards: Card[];
  eof: boolean;
}

export interface ModelType {
  namespace: 'deck';
  state: StateType;
  effects: {
    fetchDeck: Effect;
    fetchCards: Effect;
    fetchTags: Effect;
    resetCards: Effect;
  };
  reducers: {
    changeDeck: Reducer<StateType>;
    changeCards: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'deck',
  state: {
    deck: undefined,
    cards: [],
    eof: true,
  },
  effects: {
    *fetchDeck({ payload: { formatMessage, ...data } }, { call, put }) {
      const response = yield call(getDeck, data);

      if ((response.status = 'ok')) {
        yield put({
          type: 'changeDeck',
          payload: response,
        });
      } else {
        message.error(
          response.message ||
            formatMessage({ id: 'anki.deck.fetch.deck.failed' }),
        );
      }
    },
    *fetchCards({ payload: { formatMessage, ...data } }, { call, put }) {
      //todo
      yield put({
        type: 'changeCards',
        payload: {
          cards: [],
          eof: true,
        },
      });
    },
    *fetchTags({ payload: { formatMessage, ...data } }, { call, put }) {
      //todo
      const response = yield call(getTags, data);
    },
    *resetCards({ payload: { formatMessage, ...data } }, { call, put }) {
      const response = yield call(initCards, data);
      if (response.status === 'ok') {
        yield put({
          type: 'changeCards',
        });
      }
    },
  },
  reducers: {
    changeDeck(state, { payload }) {
      return {
        ...state,
        deck: payload.deck,
        cards: payload.cards,
        eof: payload.eof,
      };
    },
    changeCards(state, { payload }) {
      return {
        ...state,
        cards: payload.cards,
        eof: payload.eof,
      };
    },
  },
};

export default Model;
