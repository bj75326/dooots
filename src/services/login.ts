import request from '@/utils/request';

export async function queryAuthority(): Promise<any> {
  return request('/api/authority');
}
