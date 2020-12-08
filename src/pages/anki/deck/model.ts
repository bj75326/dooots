import { Effect, Reducer } from 'umi';
import { message, notification } from 'antd';

import {} from './service';

export interface Card {
  cardId: string;
  cardName: string;
}

interface Deck {}

export interface StateType {
  deck: Deck;
  cards: Card[];
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
    cards: [],
    eof: true,
  },
  effects: {},
  reducers: {},
};

export default Model;
