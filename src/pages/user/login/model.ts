import { Effect, Reducer } from 'umi';
import { message } from 'antd';
import { fakeAccountLogin } from './service';

export interface StateType {
  status?: 'ok' | 'error';
  currentAuthority?: 'user' | 'guest' | 'admin';
}

export interface ModelType {
  namespace: 'userAndLogin';
  state: StateType;
  effects: {
    login: Effect;
  };
  reducers: {
    changeLoginStatus: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'userAndLogin',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      const { formatMessage, values } = payload;
      const response = yield call(fakeAccountLogin, values);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
      // Login successfully
      if (response.status === 'ok') {
        message.success(formatMessage({ id: 'userAndLogin.login.success' }));
      }
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {},
  },
};
