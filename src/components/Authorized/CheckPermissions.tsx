import React from 'react';
import { CURRENT } from './renderAuthorize';

import PromiseRender from './PromiseRender';
import GetAuthorityPromiseRender from './GetAuthorityPromiseRender';

export type IAuthorityType =
  | undefined
  | string
  | string[]
  | Promise<boolean>
  | ((currentAuthority: string | string[]) => IAuthorityType);

/**
 * 通用权限检查方法
 * Common check permissions method
 * @param { 权限判定 | Permission judgment } authority
 * @param { 你的权限 | Your permission description } currentAuthority
 * @param { 通过的组件 | Passing components } target
 * @param { 未通过的组件 | no pass components } Exception
 */
const checkPermissions = <T, K>(
  authority: IAuthorityType,
  currentAuthority: string | string[],
  target: T,
  Exception: K,
): T | K | React.ReactNode => {
  console.log('checkPermissions authority: ', authority);
  console.log('checkPermissions currentAuthority: ', currentAuthority);
  // 没有判定权限.默认查看所有
  // Retirement authority, return target;
  if (!authority) {
    return target;
  }
  // 数组处理
  if (Array.isArray(authority)) {
    if (Array.isArray(currentAuthority)) {
      if (currentAuthority.some(item => authority.includes(item))) {
        return target;
      }
    } else if (authority.includes(currentAuthority)) {
      return target;
    }
    return Exception;
  }
  // string 处理
  if (typeof authority === 'string') {
    if (Array.isArray(currentAuthority)) {
      if (currentAuthority.some(item => authority === item)) {
        return target;
      }
    } else if (authority === currentAuthority) {
      return target;
    }
    return Exception;
  }
  // Promise 处理
  if (authority instanceof Promise) {
    return (
      <PromiseRender<T, K> ok={target} error={Exception} promise={authority} />
    );
  }
  // Function 处理
  if (typeof authority === 'function') {
    try {
      const bool = authority(currentAuthority);
      //函数执行返回值是 Promise
      if (bool instanceof Promise) {
        return (
          <PromiseRender<T, K> ok={target} error={Exception} promise={bool} />
        );
      }
      if (bool) {
        return target;
      }
      return Exception;
    } catch (e) {
      throw new Error('unsupport parameters - authority#1');
    }
  }
  throw new Error('unsupport parameters - authority#2');
};

export { checkPermissions };

function check<T, K>(
  authority: IAuthorityType,
  target: T,
  Exception: K,
): React.ReactNode {
  console.log('[check] authority: ', authority);
  console.log('[check] current: ', CURRENT);

  return (
    <GetAuthorityPromiseRender<T, K>
      authority={authority}
      target={target}
      exception={Exception}
      current={CURRENT}
    />
  );

  //return checkPermissions<T, K>(authority, CURRENT, target, Exception);
}

export default check;
