import { Effect, Reducer } from 'umi';
import { message, notification } from 'antd';
import { Deck as DeckForDecksPage } from '../decks/model';

import { getDeck, getTags } from './service';

export interface Score {
  cardId: string;
  scoreTimestamp: number;
  score: number;
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
  scores: Score[];
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
      const response = yield call(getTags, data);
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
