import request from '@/utils/request';

export async function queryAuthority(): Promise<string | string[]> {
  return request('/api/authority');
}
