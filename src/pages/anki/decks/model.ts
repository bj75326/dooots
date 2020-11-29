import { Effect, Reducer, history } from 'umi';
import { message, notification } from 'antd';

import { addNewDeck, getDecks } from './service';

export interface Deck {
  deckId: string;
  deckName: string;
  description?: string;
  tags?: string[];
  numberOfCards: number;
  numberOfOverdue: number;
  numberOfToday: number;
  numberOfUnactivated: number;
  status: 'Overdue' | 'Today' | 'Underway' | 'Unactivated';
}

export interface StateType {
  decks: Deck[];
}

export interface ModelType {
  namespace: 'decks';
  state: StateType;
  effects: {
    addDeck: Effect;
    fetchDecks: Effect;
  };
  reducers: {
    changeDecks: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'decks',

  state: {
    decks: [],
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
    *fetchDecks({ payload: { formatMessage } }, { call, put }) {
      const response = yield call(getDecks);

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
  },

  reducers: {
    changeDecks(state, { payload }): StateType {
      return {
        ...state,
        decks: payload.decks,
      };
    },
  },
};

export default Model;
