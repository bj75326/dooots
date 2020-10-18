import React from 'react';
import { Tooltip } from 'antd';
import { NavLink, useIntl } from 'umi';
import {
  UserOutlined,
  HighlightOutlined,
  HomeOutlined,
} from '@ant-design/icons';

import styles from './style.less';

interface AnkiLayoutProps {
  match: {
    url: string;
    path: string;
  };
  location: {
    pathname: string;
  };
}

interface AnkiMenuProps {}

const AnkiMenu: React.FC<AnkiMenuProps> = () => {
  const { formatMessage } = useIntl();

  return (
    <ul className={styles.ankiMenu}>
      <Tooltip
        placement="right"
        title={formatMessage({ id: 'anki.menu.home' })}
      >
        <li>
          <NavLink to="/anki/collections" activeClassName={styles.selected}>
            <HomeOutlined className={styles.ankiMenuIcon} />
          </NavLink>
        </li>
      </Tooltip>
      <Tooltip
        placement="right"
        title={formatMessage({ id: 'anki.menu.person' })}
      >
        <li>
          <NavLink to="/anki/person" activeClassName={styles.selected}>
            <UserOutlined className={styles.ankiMenuIcon} />
          </NavLink>
        </li>
      </Tooltip>
    </ul>
  );
};

const AnkiLayout: React.FC<AnkiLayoutProps> = props => {
  console.log('route: ', props.route);
  console.log('match: ', props.match);
  console.log('location: ', props.location);

  const { children } = props;

  return (
    <div className={styles.anki}>
      <AnkiMenu />
      <div className={styles.wrapper}>{children}</div>
    </div>
  );
};

export default AnkiLayout;
