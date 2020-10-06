import React from 'react';
import { Link, useIntl, ConnectProps, connect } from 'umi';
import { ConnectState, Settings } from '@/models/connect';
import {
  MenuDataItem,
  getMenuData,
  getPageTitle,
} from '@ant-design/pro-layout';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import SelectLang from '@/components/SelectLang';
import logo from '../assets/logo.svg';
import {
  MailOutlined,
  GithubOutlined,
  TwitterOutlined,
} from '@ant-design/icons';
import classNames from 'classnames';

import styles from './UserLayout.less';

export interface UserLayoutProps extends Partial<ConnectProps> {
  breadcrumbNameMap: {
    [path: string]: MenuDataItem;
  };
  settings: Settings;
}

const UserLayout: React.FC<UserLayoutProps> = props => {
  const {
    route = { routes: [] },
    children,
    location = { pathname: '' },
    settings,
  } = props;
  const { routes = [] } = route;
  console.log('route: ', route);
  console.log('routes: ', routes);

  const { formatMessage } = useIntl();
  const { breadcrumb } = getMenuData(routes);
  console.log('breadcrumb: ', breadcrumb);

  const title = getPageTitle({
    pathname: location.pathname,
    formatMessage,
    breadcrumb,
    ...props,
  });
  console.log('location: ', location);
  console.log('title: ', title);
  console.log('children: ', children);

  const { theme } = settings;

  return (
    <HelmetProvider>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={title} />
      </Helmet>
      <div
        className={classNames(styles.container, {
          [styles.dark]: theme === 'dark',
        })}
      >
        <div className={styles.lang}>
          <SelectLang />
        </div>
        <div className={styles.signature}>
          <div>{formatMessage({ id: 'app.userLayout.signature' })}</div>
          <ul className={styles.contact}>
            <li>
              <a
                href="mailto:superice_gy@163.com?subject=[dooots]"
                target="_blank"
              >
                <MailOutlined />
              </a>
            </li>
            <li>
              <a href="https://github.com/bj75326/dooots" target="_blank">
                <GithubOutlined />
              </a>
            </li>
            <li>
              <a href="https://twitter.com/icechicken6" target="_blank">
                <TwitterOutlined />
              </a>
            </li>
          </ul>
        </div>
        <div className={styles.content}>
          <div className={styles.left}>
            <div className={styles.header}>
              <Link to="/">
                <img alt="logo" className={styles.logo} src={logo} />
                <span className={styles.title}>dooots</span>
              </Link>
            </div>
            <div className={styles.welcome}>
              {formatMessage({ id: 'app.userLayout.welcome' })}
            </div>
            <div className={styles.dooots}>DOOOTS</div>
            {children}
          </div>
        </div>
      </div>
    </HelmetProvider>
  );
};

export default connect(({ settings }: ConnectState) => ({
  settings,
}))(UserLayout);
