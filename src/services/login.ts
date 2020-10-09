import request from '@/utils/request';

export async function queryAuthority(): Promise<{
  authority: string | string[];
}> {
  return request('/api/authority');
}

export interface LoginParamsType {
  userName: string;
  password: string;
}

export async function fakeAccountLogin(params: LoginParamsType) {
  // server端应该在返回信息中附带识别身份的cookie
  return request('/api/login/account', {
    method: 'POST',
    data: params,
  });
}

export async function fakeAccountLogout() {
  // server端应该在返回信息时要求移除识别身份的cookie
  return request('/api/logout/account');
}
