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
  return request('/api/login/account', {
    method: 'POST',
    data: params,
  });
}
