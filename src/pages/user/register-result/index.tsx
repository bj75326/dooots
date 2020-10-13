import React from 'react';
import { useIntl, useLocation, history } from 'umi';
import { Button } from 'antd';

import styles from './styles.less';

interface RegisterResultProps {}

const RegisterResult: React.FC<RegisterResultProps> = () => {
  const { formatMessage } = useIntl();
  const location = useLocation<{ account?: string }>();

  const handleClick = () => {
    history.push('/user/login');
  };

  return (
    <div className={styles.result}>
      <div className={styles.greet}>
        <span>
          {formatMessage({
            id: 'userandregister-result.register-result.yourname',
          })}
        </span>
        <span className={styles.account}>{location.state.account || null}</span>
        <span>
          {formatMessage({
            id: 'userandregister-result.register-result.success',
          })}
        </span>
      </div>
      <Button
        size="large"
        type="primary"
        className={styles.toLogin}
        onClick={handleClick}
      >
        {formatMessage({
          id: 'userandregister-result.register-result.toLogin',
        })}
      </Button>
    </div>
  );
};

export default RegisterResult;
