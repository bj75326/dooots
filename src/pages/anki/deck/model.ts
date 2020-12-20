import { Effect, Reducer } from 'umi';
import { message, notification } from 'antd';
import { Deck as DeckForDecksPage } from '../decks/model';

import {
  getDeck,
  getTags,
  initCards,
  removeCards,
  toggleStick,
} from './service';

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
  tags: string[];
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
    deleteCards: Effect;
    stickOrUnstickCard: Effect;
  };
  reducers: {
    changeDeck: Reducer<StateType>;
    changeCards: Reducer<StateType>;
    initCards: Reducer<StateType>;
    removeCards: Reducer<StateType>;
    sortCards: Reducer<StateType>;
  };
}

export const sortCards = (cards: Card[]) => {
  const sticks: Card[] = [];
  const unsticks: Card[] = [];
  cards.forEach(card => {
    if (card.stick) {
      sticks.push(card);
    } else {
      unsticks.push(card);
    }
  });
  return sticks
    .sort(
      (cardA, cardB) =>
        (cardB.stickTimestamp as number) - (cardA.stickTimestamp as number),
    )
    .concat(
      unsticks.sort(
        (cardA, cardB) => cardB.createTimestamp - cardA.createTimestamp,
      ),
    );
};

const Model: ModelType = {
  namespace: 'deck',
  state: {
    deck: undefined,
    cards: [],
    tags: [],
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
      if (response.status === 'ok') {
      } else if (response.status === 'error') {
      }
    },
    *resetCards({ payload: { formatMessage, ...data } }, { call, put }) {
      const response = yield call(initCards, data);
      if (response.status === 'ok') {
        yield put({
          type: 'initCards',
          payload: response,
        });
      } else if (response.status === 'error') {
        message.error(
          response.message || formatMessage({ id: 'anki.deck.reset.failed' }),
        );
      }
    },
    *deleteCards({ payload: { formatMessage, ...data } }, { call, put }) {
      const response = yield call(removeCards, data);
      if (response.status === 'ok') {
        yield put({
          type: 'removeCards',
          payload: response,
        });
      } else if (response.status === 'error') {
        message.error(
          response.message || formatMessage({ id: 'anki.deck.delete.failed' }),
        );
      }
    },
    *stickOrUnstickCard({ payload }, { call, put }) {
      const { formatMessage, ...data } = payload;
      const response = yield call(toggleStick, data);
      if (response.status === 'ok') {
        yield put({
          type: 'sortCards',
          payload: response,
        });
      } else if (response.status === 'error') {
        message.error(
          response.message ||
            (data.stick
              ? formatMessage({ id: 'anki.deck.stick.card.failed' })
              : formatMessage({ id: 'anki.deck.unstick.card.failed' })),
        );
      }
    },
  },
  reducers: {
    changeDeck(state, { payload }) {
      return {
        ...state,
        deck: payload.deck,
        cards: payload.cards,
        tags: payload.tags,
        eof: payload.eof,
      };
    },
    changeCards(state, { payload }) {
      return {
        ...(state as StateType),
        cards: payload.cards,
        eof: payload.eof,
      };
    },
    initCards(state, { payload }) {
      const { cards } = state as StateType;
      const { cards: resCards } = payload;
      return {
        ...(state as StateType),
        cards: cards.map((card: Card) => {
          if (
            !!resCards.find(
              (resCard: { deckId: string; cardId: string }) =>
                resCard.deckId === card.deckId &&
                resCard.cardId === card.cardId,
            )
          ) {
            return {
              ...card,
              status: 'unactivated',
              rates: [],
            };
          }
          return card;
        }),
      };
    },
    removeCards(state, { payload }) {
      const { cards } = state as StateType;
      const { cards: resCards } = payload;
      return {
        ...(state as StateType),
        cards: cards.filter(
          (card: Card) =>
            !resCards.find(
              (c: { deckId: string; cardId: string }) =>
                c.deckId === card.deckId && c.cardId === card.cardId,
            ),
        ),
      };
    },
    sortCards(state, { payload }): StateType {
      const { cards } = state as StateType;
      const { deckId, cardId, stick, stickTimestamp } = payload;
      return {
        ...(state as StateType),
        cards: sortCards(
          cards.map((card: Card) => {
            if (deckId === card.deckId && cardId === card.cardId) {
              return {
                ...card,
                stick,
                stickTimestamp,
              };
            }
            return card;
          }),
        ),
      };
    },
  },
};

export default Model;
