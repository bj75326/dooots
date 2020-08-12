import { Subscription, Reducer, Effect } from 'umi';

export interface GlobalModelState {}

export interface GlobalModelType {
  namespace: 'global';
  state: GlobalModelState;
  effects: {};
  reducers: {};
  subscriptions: {};
}

const GlobalModel: GlobalModelType = {
  namespace: 'global',

  state: {},

  effects: {},

  reducers: {},

  subscriptions: {},
};

export default GlobalModel;