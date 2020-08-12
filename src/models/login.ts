import { history, Reducer, Effect } from 'umi';

export interface StateType {
  status?: 'ok' | 'error';
  type?: 'string';
  currentAuthority?: 'user' | 'guest' | 'admin';
}

export interface LoginModelType {
  namespace: 'login';
  state: StateType;
  effects: {
    login: Effect;
    logout: Effect;
  };
  reducers: {
    changeLoginStatus: Reducer<StateType>;
  };
}

const Model: LoginModelType = {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {},
    *logout() {},
  },

  reducers: {
    changeLoginStatus(state, { payload }) {},
  },
};

export default Model;
