import { Tooltip, Avatar, Spin, Divider } from 'antd';
import {} from '@ant-design/icons';
import React from 'react';
import { connect, ConnectProps } from 'umi';
import { ConnectState } from '@/models/connect';
import { CurrentUser } from '@/models/user';

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
          borderLeftColor: theme === 'dark' ? 'rgb(255 255 255 / 12%)' : '#ccc',
        }}
      />
    </div>
  );
};

export default connect(({ settings, user }: ConnectState) => ({
  theme: settings.theme,
  currentUser: user.currentUser,
}))(GlobalHeaderRight);