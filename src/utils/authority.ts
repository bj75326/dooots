import { queryAuthority } from '@/services/login';

// ant design pro use localStorage to store the authority info.
// dooots mock the operation get authority from server side.

export function getAuthority(): Promise<any> {
  return queryAuthority();
}
