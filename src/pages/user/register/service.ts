import request from 'umi-request';
import { UserRegisterParams } from './index';

export async function fakeRegister(params: UserRegisterParams) {
  return request('/api/register', {
    method: 'POST',
    data: params,
  });
}

export async function checkNameUnique(params: { username: string }) {
  return request('/api/register/unique', {
    method: 'POST',
    data: params,
  });
}
