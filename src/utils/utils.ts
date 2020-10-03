import { Route } from '@/models/connect';
import { pathToRegexp } from 'path-to-regexp';

export const getRouteAuthority = (path: string, routeData: Route[]) => {
  let authorities: string[] | string | undefined;
  routeData.forEach(route => {
    // match prefix => route.path是当前path的父级路径或者相同路径
    if (pathToRegexp(`${route.path}/(.*)`).test(`${path}/`)) {
      // 三种情况，从上往下权重依次加强

      if (route.authority) {
        authorities = route.authority;
      }
      // exact match
      if (route.path === path) {
        authorities = route.authority || authorities;
      }
      // get children authority recursively
      if (route.routes) {
        authorities = getRouteAuthority(path, route.routes) || authorities;
      }
    }
  });
  return authorities;
};

export const getAuthorityFromRouter = <T extends Route>(
  router: T[] = [],
  pathname: string,
): T | undefined => {
  const authority = router.find(
    ({ routes, path = '/' }) =>
      (path && pathToRegexp(path).exec(pathname)) ||
      (routes && getAuthorityFromRouter(routes, pathname)),
  );
  console.log('getAuthorityFromRouter: ', authority);
  if (authority) return authority;
  return undefined;
};

export const setCookie = (
  name: string,
  value: string,
  exp = Infinity,
  path = '/',
): void => {
  const date = new Date();
  let expires;
  if (exp === Infinity) {
    expires = 'Fri, 31 Dec 9999 23:59:59 GMT';
  } else {
    date.setTime(date.getTime() + exp * 24 * 3600 * 1000);
    expires = date.toUTCString();
  }
  document.cookie = `${escape(name)}=${escape(
    value,
  )};expires=${expires};path=${path}`;
};

export const getCookie = (name: string) => {
  let arr,
    reg = new RegExp('(^| )' + escape(name) + '=([^;]*)(;|$)');
  if ((arr = document.cookie.match(reg))) {
    return unescape(arr[2]);
  } else {
    return null;
  }
};
