import { Effect, Reducer } from 'umi';
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
      const response = yield call(addNewDeck, payload);
    },
  },

  reducers: {},
};

export default Model;
