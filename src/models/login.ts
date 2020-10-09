import { history, Reducer, Effect } from 'umi';
import { fakeAccountLogin, fakeAccountLogout } from '@/services/login';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { message, notification } from 'antd';

export interface StateType {
  status?: 'ok' | 'error';
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
          message: formatMessage({ id: 'user.login.error.message' }),
          description: formatMessage({ id: 'user.login.error.description' }),
        });
      }
    },
    *logout(_, { put, call }) {
      const response = yield call(fakeAccountLogout);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
      history.push({
        pathname: '/user/login',
        query: {
          redirect: window.location.href,
        },
      });
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
