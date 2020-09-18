import { parse } from 'qs';

export const getPageQuery = () => parse(window.location.href.split('?')[1]);

export const setAuthority = (authority: string | string[]) => {
  const doootsAuthority =
    typeof authority === 'string' ? [authority] : authority;

  try {
    if (window.reloadAuthorized) {
      window.reloadAuthorized();
    }
  } catch (error) {
    // nntd
  }

  return doootsAuthority;
};
