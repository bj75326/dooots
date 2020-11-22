import { Effect, Reducer, history } from 'umi';
import { message, notification } from 'antd';

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
      } else if (response.existed === false) {
        resolve();
      } else {
        reject(formatMessage({ id: 'userAndRegister.username.unique.failed' }));
      }
    },

    *submit({ payload }, { call, put }) {
      const { formatMessage, ...values } = payload;
      const response = yield call(fakeRegister, values);
      yield put({
        type: 'registerHandle',
        payload: response,
      });
      // Register successfully
      if (response.status === 'ok') {
        message.success(
          formatMessage({ id: 'userAndRegister.register.success' }),
        );
        history.push({
          pathname: '/user/register-result',
          state: {
            account: values.userName,
          },
        });
      } else if (response.status === 'error') {
        notification['error']({
          message:
            response.message ||
            formatMessage({ id: 'userAndRegister.register.failed.message' }),
          description:
            response.description ||
            formatMessage({
              id: 'userAndRegister.register.failed.description',
            }),
        });
      }
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
