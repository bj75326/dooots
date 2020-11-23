import React from 'react';
import { Tooltip } from 'antd';
import { NavLink, useIntl, connect, ConnectProps } from 'umi';
import { UserOutlined, HomeOutlined } from '@ant-design/icons';
import { ConnectState } from '@/models/connect';
import { SettingModelState } from '@/models/settings';
import classNames from 'classnames';

import styles from './style.less';

interface AnkiLayoutProps extends ConnectProps {
  theme: SettingModelState['theme'];
}

interface AnkiMenuProps {
  theme: SettingModelState['theme'];
}

const AnkiMenu: React.FC<AnkiMenuProps> = props => {
  const { formatMessage } = useIntl();
  const { theme } = props;

  return (
    <ul
      className={classNames(styles.ankiMenu, {
        [styles.darkMenu]: theme === 'dark',
      })}
    >
      <Tooltip
        placement="right"
        title={formatMessage({ id: 'anki.menu.home' })}
      >
        <li>
          <NavLink to="/anki/decks" activeClassName={styles.selected}>
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

  const { children, theme } = props;

  return (
    <div className={styles.anki}>
      <AnkiMenu theme={theme} />
      <div className={styles.wrapper}>{children}</div>
    </div>
  );
};

export default connect(({ settings }: ConnectState) => ({
  theme: settings.theme,
}))(AnkiLayout);
