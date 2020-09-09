import React from 'react';
import { LogoutOutlined } from '@ant-design/icons';
import { connect, ConnectProps } from 'umi';
import classNames from 'classnames';

import styles from './index.less';

export interface LogoutIconViewProps extends Partial<ConnectProps> {
  className?: string;
  icon?: React.ReactNode;
}

const LogoutIconView: React.FC<LogoutIconViewProps> = props => {
  const { className, icon } = props;
  const logoutButtonCls = classNames(className, styles.logoutButton);
  const LogoutIcon = icon || <LogoutOutlined className={styles.icon} />;

  const handleClick = () => {
    const { dispatch } = props;
    if (dispatch) {
      dispatch({
        type: 'login/logout',
      });
    }
    return;
  };

  return (
    <span className={logoutButtonCls} onClick={handleClick}>
      {LogoutIcon}
    </span>
  );
};

export default connect(() => {})(LogoutIconView);
