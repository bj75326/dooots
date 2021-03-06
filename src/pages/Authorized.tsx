import React from 'react';
import { Redirect, connect, ConnectProps } from 'umi';
import { ConnectState, UserModelState } from '@/models/connect';
import Authorized from '@/utils/Authorized';
import { getRouteAuthority } from '@/utils/utils';

interface AuthComponentProps extends ConnectProps {
  user: UserModelState;
}

const AuthComponent: React.FC<AuthComponentProps> = ({
  children,
  route = {
    routes: [],
  },
  location = {
    pathname: '',
  },
  user,
}) => {
  const { currentUser } = user;
  const { routes = [] } = route;
  const isLogin = currentUser && currentUser.name;

  console.log('Authorized.tsx location.pathname: ', location.pathname);
  console.log('Authorized.tsx routes: ', routes);
  console.log(
    'Authorized.tsx authority required: ',
    getRouteAuthority(location.pathname, routes),
  );
  console.log('Authorized.tsx children: ', children);
  return (
    <Authorized
      authority={getRouteAuthority(location.pathname, routes) || ''}
      noMatch={
        isLogin ? (
          <Redirect to="/exception/403" />
        ) : (
          <Redirect
            to={{
              pathname: '/user/login',
              search: `?redirect=${encodeURIComponent(window.location.href)}`,
            }}
          />
        )
      }
    >
      {children}
    </Authorized>
  );
};

export default connect(({ user }: ConnectState) => ({
  user,
}))(AuthComponent);
