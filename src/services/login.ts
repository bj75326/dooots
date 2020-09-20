import request from '@/utils/request';

export async function queryAuthority(): Promise<{
  authority: string | string[];
}> {
  return request('/api/authority');
}
