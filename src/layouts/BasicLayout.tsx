/**
 * The story begins.
 */
import ProLayout, {
  MenuDataItem,
  BasicLayoutProps as ProLayoutProps,
} from '@ant-design/pro-layout';
import React, { useEffect } from 'react';
import { Link, useIntl, connect, Dispatch } from 'umi';
import { ConnectState, Settings } from '@/models/connect';
import { Result, Button } from 'antd';
import Authorized from '@/utils/Authorized';
import { getAuthorityFromRouter } from '@/utils/utils';
import logo from '@/assets/logo.svg';

const noMatch = (
  <Result
    status={403}
    title="403"
    subTitle="Sorry, you are not authorized to access this page."
    extra={
      <Button type="primary">
        <Link to="/user/login">Go Login</Link>
      </Button>
    }
  />
);

export interface BasicLayoutProps extends ProLayoutProps {
  breadcrumbNameMap: {
    [path: string]: MenuDataItem;
  };
  route: ProLayoutProps['route'] & {
    authority: string[];
  };
  settings: Settings;
  dispatch: Dispatch;
}

export type BasicLayoutContext = { [K in 'location']: BasicLayoutProps[K] } & {
  breadcrumbNameMap: {
    [path: string]: MenuDataItem;
  };
};

const BasicLayout: React.FC<BasicLayoutProps> = props => {
  const {
    dispatch,
    children,
    settings,
    location = {
      pathname: '/',
    },
  } = props;

  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'user/fetchCurrent',
      });
    }
  }, []);

  const authorized = getAuthorityFromRouter(
    props.route.routes,
    location.pathname || '/',
  ) || {
    authority: undefined,
  };

  const { formatMessage } = useIntl();

  return (
    <>
      <ProLayout
        logo={logo}
        title="dooots"
        formatMessage={formatMessage}
        layout="topmenu"
        navTheme="light"
        menuHeaderRender={logoDom => <Link to="/">{logoDom}</Link>}
        menuItemRender={(menuItemProps, defaultDom) => {
          if (
            menuItemProps.isUrl ||
            menuItemProps.children ||
            !menuItemProps.path
          ) {
            return defaultDom;
          }
          return <Link to={menuItemProps.path}>{defaultDom}</Link>;
        }}
        pageTitleRender={false}
        {...props}
        {...settings}
        disableMobile={true}
      >
        <Authorized authority={authorized!.authority} noMatch={noMatch}>
          {children}
        </Authorized>
      </ProLayout>
    </>
  );
};

export default connect(({ settings }: ConnectState) => ({
  settings,
}))(BasicLayout);
