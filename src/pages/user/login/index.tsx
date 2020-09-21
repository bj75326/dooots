import React from 'react';
import {} from 'antd';
import { connect, Dispatch, Link, useIntl } from 'umi';
import { LoginParamsType } from './service';
import { StateType } from './model';
import LoginForm from './components/Login';

import styles from './style.less';

const { UserName, Password } = LoginForm;
interface LoginProps {
  dispatch: Dispatch;
  userAndLogin: StateType;
  submitting?: boolean;
}

const Login: React.FC<LoginProps> = props => {
  const { userAndLogin = {}, submitting } = props;
  const { status } = userAndLogin;
  const { formatMessage } = useIntl();

  const handleSubmit = (values: LoginParamsType) => {
    const { dispatch } = props;
    dispatch({
      type: 'userAndLogin/login',
      payload: {
        values,
        formatMessage,
      },
    });
  };

  return (
    <div className={styles.main}>
      <LoginForm onSubmit={handleSubmit}>
        <UserName />
        <Password />
      </LoginForm>
    </div>
  );
};

export default connect(
  ({
    userAndLogin,
    loading,
  }: {
    userAndLogin: StateType;
    loading: {
      effects: {
        [key: string]: boolean;
      };
    };
  }) => ({
    userAndLogin,
    submitting: loading.effects['userAndLogin/login'],
  }),
)(Login);
