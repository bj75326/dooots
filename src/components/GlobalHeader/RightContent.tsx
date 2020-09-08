import { Tooltip, Avatar, Spin, Divider } from 'antd';
import React from 'react';
import { connect, ConnectProps } from 'umi';
import { ConnectState } from '@/models/connect';
import { CurrentUser } from '@/models/user';
import NoticeIconView from './NoticeIconView';
import SettingIconView from './SettingIconView';

import styles from './index.less';

export type Theme = 'light' | 'dark';

export interface GlobalHeaderRightProps extends Partial<ConnectProps> {
  theme?: Theme;
  currentUser?: CurrentUser;
}

const GlobalHeaderRight: React.SFC<GlobalHeaderRightProps> = props => {
  const { theme, currentUser } = props;

  let className = styles.right;

  if (theme === 'dark') {
    className = `${styles.right} ${styles.dark}`;
  }

  return (
    <div className={className}>
      {currentUser && currentUser.name ? (
        <span className={styles.avatar}>
          <Avatar src={currentUser.avatar} size={26} />
          <span className={styles.name}>{currentUser.name}</span>
        </span>
      ) : (
        <Spin size="small" />
      )}
      <Divider
        type="vertical"
        style={{
          top: 0,
          height: '1.28em',
          margin: '0 9px 0 20px',
          //antd 4.0.0 divider doesn't support dark mode
          //borderLeftColor: theme === 'dark' ? 'rgb(255 255 255 / 12%)' : '#ccc',
        }}
      />
      <NoticeIconView />
      <SettingIconView />
    </div>
  );
};

export default connect(({ settings, user }: ConnectState) => ({
  theme: settings.theme,
  currentUser: user.currentUser,
}))(GlobalHeaderRight);
