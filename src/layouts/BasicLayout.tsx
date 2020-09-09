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
import { changeTheme } from '@/models/settings';
import { Result, Button, Dropdown, Menu, Popover } from 'antd';
import Authorized from '@/utils/Authorized';
import { getAuthorityFromRouter } from '@/utils/utils';
import logo from '@/assets/logo.svg';
import RightContent from '@/components/GlobalHeader/RightContent';

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

const menu = (
  <Menu>
    <Menu.Item>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="http://www.alipay.com/"
      >
        1st menu item
      </a>
    </Menu.Item>
    <Menu.Item>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="http://www.taobao.com/"
      >
        2nd menu item
      </a>
    </Menu.Item>
  </Menu>
);

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
        <Authorized authority={authorized!.authority} noMatch={noMatch}>
          {children}
        </Authorized>
      </ProLayout>
      <Button
        onClick={() => {
          // dispatch({
          //   type: 'settings/changeSetting',
          //   payload: {
          //     theme: settings.theme === 'dark' ? 'light' : 'dark',
          //   },
          // });
          changeTheme(
            {
              ...settings,
              theme: settings.theme === 'dark' ? 'light' : 'dark',
            },
            dispatch,
            formatMessage,
          );
        }}
        style={{
          position: 'fixed',
          top: '300px',
          left: '300px',
        }}
      >
        Setting Theme
      </Button>
      <Button
        onClick={() => {
          // dispatch({
          //   type: 'settings/changeSetting',
          //   payload: {
          //     primaryColor:
          //       settings.primaryColor === 'default' ? 'star' : 'default',
          //   },
          // });
          changeTheme(
            {
              ...settings,
              primaryColor:
                settings.primaryColor === 'default' ? 'star' : 'default',
            },
            dispatch,
            formatMessage,
          );
        }}
        style={{
          position: 'fixed',
          top: '300px',
          left: '500px',
        }}
      >
        Setting Color
      </Button>
    </>
  );
};

export default connect(({ settings }: ConnectState) => ({
  settings,
}))(BasicLayout);
