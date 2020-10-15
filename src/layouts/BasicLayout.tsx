/**
 * The story begins.
 */
import ProLayout, {
  MenuDataItem,
  getMenuData,
  getPageTitle,
  BasicLayoutProps as ProLayoutProps,
} from '@ant-design/pro-layout';
import React, { useEffect } from 'react';
import { Link, useIntl, connect, Dispatch } from 'umi';
import { ConnectState, Settings } from '@/models/connect';
import { changeTheme } from '@/models/settings';
import { Result, Button, Spin } from 'antd';
import Authorized from '@/utils/Authorized';
import { getAuthorityFromRouter } from '@/utils/utils';
import logo from '@/assets/logo.svg';
import RightContent from '@/components/GlobalHeader/RightContent';
import { Helmet, HelmetProvider } from 'react-helmet-async';

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
  logouting: boolean;
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
    logouting,
  } = props;

  useEffect(() => {
    console.log('run basicLayout useEffect');
    // safari测试的时候，从mock拿回数据的速度甚至超过了redirect re-render的速度，上线后应该不存在这个问题。
    // setTimeout(() => {
    if (dispatch) {
      dispatch({
        type: 'user/fetchCurrent',
      });
    }
    // }, 0)
  }, []);
  console.log('BasicLayout run routes: ', props.route.routes);
  console.log('BasicLayout run location.pathname: ', location.pathname);
  const authorized = getAuthorityFromRouter(
    props.route.routes,
    location.pathname || '/',
  ) || {
    authority: undefined,
  };
  console.log('BasicLayout run authorized: ', authorized);

  const { formatMessage } = useIntl();

  const { breadcrumb } = getMenuData(props.route.routes || []);
  const title = getPageTitle({
    pathname: location.pathname,
    formatMessage,
    breadcrumb,
  });

  console.log('BasicLayout render run');

  return (
    <HelmetProvider>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={title} />
      </Helmet>
      <Spin spinning={logouting} size="large">
        <ProLayout
          logo={logo}
          formatMessage={formatMessage}
          layout="topmenu"
          navTheme={settings.theme}
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
          disableMobile={true}
          rightContentRender={() => <RightContent />}
          {...props}
          {...settings}
        >
          {/* <Authorized authority={authorized!.authority} noMatch={noMatch}> */}
          {children}
          {/* </Authorized> */}
        </ProLayout>
      </Spin>
    </HelmetProvider>
  );
};

export default connect(({ settings, loading }: ConnectState) => ({
  settings,
  logouting: !!loading.effects['login/logout'],
}))(BasicLayout);
