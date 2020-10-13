import React from 'react';
import { useIntl, useLocation } from 'umi';
import { Button } from 'antd';

import styles from './styles.less';

interface RegisterResultProps {}

const RegisterResult: React.FC<RegisterResultProps> = () => {
  const { formatMessage } = useIntl();
  const location = useLocation();

  return (
    <div className={styles.result}>
      <div className={styles.username}>
        <span>
          {formatMessage({
            id: 'userandregister-result.register-result.yourname',
          })}
        </span>
      </div>
      <div>
        {formatMessage({ id: 'userandregister-result.register-result.greet' })}
      </div>
      <Button>
        {formatMessage({
          id: 'userandregister-result.register-result.toLogin',
        })}
      </Button>
    </div>
  );
};

export default RegisterResult;
