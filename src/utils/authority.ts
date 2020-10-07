import { queryAuthority } from '@/services/login';

// ant design pro use localStorage to store the authority info.
// dooots mock the operation get authority from server side.

export function getAuthority(): Promise<{ authority: string | string[] }> {
  return queryAuthority();
}

export function setAuthority(authority: string | string[]) {
  try {
    if (window.reloadAuthorized) {
      window.reloadAuthorized();
    }
  } catch (error) {
    // nntd
  }

  return authority;
}
