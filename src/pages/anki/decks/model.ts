import { Effect, Reducer, history } from 'umi';
import { message, notification } from 'antd';

import { addNewDeck } from './service';

export interface Deck {}

export interface StateType {
  decks: Deck[];
}

export interface ModelType {
  namespace: 'decks';
  state: StateType;
  effects: {
    addDeck: Effect;
  };
  reducers: {};
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
          pathname: `/anki/${response.deckName}`,
          state: {
            deckId: response.deckId,
          },
        });
      } else if (response.status === 'error') {
        notification['error']({
          message:
            response.message ||
            formatMessage({ id: 'anki.decks.new.deck.failed.message' }),
          description:
            response.description ||
            formatMessage({ id: 'anki.decks.new.deck.failed.description' }),
        });
      }
    },
  },

  reducers: {},
};

export default Model;
