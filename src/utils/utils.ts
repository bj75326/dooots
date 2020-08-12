import { Route } from '@/models/connect';
import pathRegexp from 'path-to-regexp';

export const getRouteAuthority = (path: string, routeData: Route[]) => {
  let authorities: string[] | string | undefined;
  routeData.forEach(route => {
    // match prefix => route path是当前path的父级路径或者相同路径
    if (pathRegexp(`${route.path}/(.*)`).test(`${path}/`)) {
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
