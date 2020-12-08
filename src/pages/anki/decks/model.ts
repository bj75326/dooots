import { Effect, Reducer, history } from 'umi';
import { message, notification } from 'antd';

import { addNewDeck, getDecks, toggleStick, removeDeck } from './service';

export interface Deck {
  deckId: string;
  deckName: string;
  description?: string;
  tags?: string[];
  numberOfCards: number;
  numberOfOverdue: number;
  numberOfToday: number;
  numberOfUnactivated: number;
  status: 'overdue' | 'today' | 'underway' | 'unactivated';
  createTimestamp: number;
  updateTimestamp?: number;
  stick: boolean;
  stickTimestamp?: number;
  author?: string;
}

export interface StateType {
  decks: Deck[];
  eof: boolean;
}

export interface ModelType {
  namespace: 'decks';
  state: StateType;
  effects: {
    addDeck: Effect;
    fetchDecks: Effect;
    stickOrUnstickDeck: Effect;
    deleteDeck: Effect;
  };
  reducers: {
    changeDecks: Reducer<StateType>;
    sortDecks: Reducer<StateType>;
    removeDeck: Reducer<StateType>;
  };
}

export const sortDecks = (decks: Deck[]): Deck[] => {
  const sticks = decks.filter(deck => deck.stick);
  const unsticks = decks.filter(deck => !deck.stick);
  return sticks
    .sort(
      (deckA, deckB) =>
        (deckB.stickTimestamp as number) - (deckA.stickTimestamp as number),
    )
    .concat(
      unsticks.sort(
        (deckA, deckB) => deckB.createTimestamp - deckA.createTimestamp,
      ),
    );
};

const Model: ModelType = {
  namespace: 'decks',

  state: {
    decks: [],
    eof: true,
  },

  effects: {
    *addDeck({ payload }, { call }) {
      const { formatMessage, ...values } = payload;
      const response = yield call(addNewDeck, values);
      if (response.status === 'ok') {
        message.success(formatMessage({ id: 'anki.decks.new.deck.success' }));
        history.push({
          pathname: `/anki/${response.deckId}`,
          // state: {
          //   deckId: response.deckId,
          // },
        });
      } else if (response.status === 'error') {
        // notification['error']({
        //   message:
        //     response.message ||
        //     formatMessage({ id: 'anki.decks.new.deck.failed.message' }),
        //   description:
        //     response.description ||
        //     formatMessage({ id: 'anki.decks.new.deck.failed.description' }),
        // });
        message.error(
          response.message ||
            formatMessage({ id: 'anki.decks.new.deck.failed.message' }),
        );
      }
    },
    *fetchDecks({ payload: { formatMessage, ...data } }, { call, put }) {
      const response = yield call(getDecks, data);

      if (response.status === 'ok') {
        yield put({
          type: 'changeDecks',
          payload: response,
        });
      } else if (response.status === 'error') {
        message.error(
          response.message ||
            formatMessage({ id: 'anki.decks.fetch.decks.failed' }),
        );
      }
    },
    *stickOrUnstickDeck({ payload }, { call, put }) {
      const { formatMessage, ...data } = payload;

      const response = yield call(toggleStick, data);
      if (response.status === 'ok') {
        yield put({
          type: 'sortDecks',
          payload: response,
        });
      } else if (response.status === 'error') {
        message.error(
          response.message ||
            (data.stick
              ? formatMessage({ id: 'anki.decks.stick.deck.failed' })
              : formatMessage({ id: 'anki.decks.unstick.deck.failed' })),
        );
      }
    },
    *deleteDeck({ payload }, { call, put }) {
      const { formatMessage, ...data } = payload;
      const response = yield call(removeDeck, data);
      if (response.status === 'ok') {
        yield put({
          type: 'removeDeck',
          payload: response,
        });
      } else if (response.status === 'error') {
        message.error(
          response.message ||
            formatMessage({ id: 'anki.decks.delete.deck.failed' }),
        );
      }
    },
  },

  reducers: {
    changeDecks(state, { payload }): StateType {
      return {
        ...(state as StateType),
        decks: payload.decks,
        eof: payload.eof,
      };
    },
    sortDecks(state, { payload }): StateType {
      const { decks } = state as StateType;
      const { deckId, stick, stickTimestamp } = payload;
      return {
        ...(state as StateType),
        decks: sortDecks(
          decks.map(deck => {
            if (deck.deckId === deckId) {
              return {
                ...deck,
                stick,
                stickTimestamp,
              };
            }
            return deck;
          }),
        ),
      };
    },
    removeDeck(state, { payload }): StateType {
      const { decks } = state as StateType;
      const { deckId } = payload;
      return {
        ...(state as StateType),
        decks: decks.filter(deck => deck.deckId !== deckId),
      };
    },
  },
};

export default Model;
