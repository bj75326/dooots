import React from 'react';
import { Link, useIntl, ConnectProps, connect } from 'umi';
import {
  MenuDataItem,
  getMenuData,
  getPageTitle,
} from '@ant-design/pro-layout';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import SelectLang from '@/components/SelectLang';
import logo from '../assets/logo.svg';

import styles from './UserLayout.less';

export interface UserLayoutProps extends Partial<ConnectProps> {
  breadcrumbNameMap: {
    [path: string]: MenuDataItem;
  };
}

const UserLayout: React.FC<UserLayoutProps> = props => {
  const {
    route = { routes: [] },
    children,
    location = { pathname: '' },
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

  return (
    <HelmetProvider>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={title} />
      </Helmet>
      <div className={styles.container}>
        <div className={styles.lang}>
          <SelectLang />
        </div>
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.header}>
              <Link to="/">
                <img alt="logo" className={styles.logo} src={logo} />
                <span className={styles.title}>dooots</span>
              </Link>
            </div>
            <div className={styles.welcome}>
              {formatMessage({ id: 'app.login.welcome' })}
            </div>
            <div className={styles.dooots}>DOOOTS</div>
          </div>
        </div>
      </div>
    </HelmetProvider>
  );
};

export default connect(() => ({}))(UserLayout);
