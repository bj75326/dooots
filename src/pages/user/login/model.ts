import { Effect, history, Reducer } from 'umi';
import { message, notification } from 'antd';
import { fakeAccountLogin } from './service';
import { getPageQuery, setAuthority } from './utils/utils';

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
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params as { redirect: string };
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substring(urlParams.origin.length);
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substring(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = redirect;
            return;
          }
        }
        history.replace(redirect || '/');
      } else if (response.status === 'error') {
        notification['error']({
          message: formatMessage({ id: 'userAndLogin.login.error.message' }),
          description: formatMessage({
            id: 'userAndLogin.login.error.description',
          }),
        });
      }
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return {
        ...state,
        status: payload.status,
      };
    },
  },
};

export default Model;
