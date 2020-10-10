import { Effect, Reducer } from 'umi';

import { fakeRegister, checkNameUnique } from './service';

export interface StateType {
  status?: 'ok' | 'error';
  currentAuthority?: 'user' | 'guest' | 'admin';
}

export interface ModelType {
  namespace: 'userAndRegister';
  state: StateType;
  effects: {
    submit: Effect;
    checkNameUnique: Effect;
  };
  reducers: {
    registerHandle: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'userAndRegister',

  state: {
    status: undefined,
  },

  effects: {
    *checkNameUnique({ payload }, { call }) {
      const { reject, resolve, formatMessage, ...values } = payload;
      const response = yield call(checkNameUnique, values);
      if (response.existed === true) {
        reject(formatMessage({ id: 'userAndRegister.username.existed' }));
      } else if (response.exised === false) {
        resolve();
      } else {
        reject(formatMessage({ id: 'userAndRegister.username.unique.failed' }));
      }
    },

    *submit({ payload }, { call, put }) {
      const response = yield call(fakeRegister, payload);
      yield put({
        type: 'registerHandle',
        payload: response,
      });
    },
  },

  reducers: {
    registerHandle(state, { payload }) {
      return {
        ...state,
        status: payload.status,
      };
    },
  },
};

export default Model;
