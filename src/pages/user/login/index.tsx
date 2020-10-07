import React from 'react';
import { connect, Dispatch, Link, useIntl } from 'umi';
import { LoginParamsType } from './service';
import { StateType } from './model';
import LoginForm from './components/Login';

import styles from './style.less';

const { UserName, Password, Submit } = LoginForm;
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
    console.log('handleSubmit');
    const { dispatch } = props;
    dispatch({
      type: 'userAndLogin/login',
      payload: {
        values,
        formatMessage,
      },
    });
  };
  console.log('submitting: ', submitting);
  return (
    <div className={styles.main}>
      <LoginForm onSubmit={handleSubmit}>
        <UserName
          name="userName"
          rules={[
            {
              required: true,
              message: formatMessage({
                id: 'userAndLogin.login.username.required',
              }),
            },
          ]}
          label={formatMessage({ id: 'userAndLogin.login.username' })}
          autocomplete="off"
        />
        <Password
          name="password"
          rules={[
            {
              required: true,
              message: formatMessage({
                id: 'userAndLogin.login.password.required',
              }),
            },
          ]}
          label={formatMessage({ id: 'userAndLogin.login.password' })}
        />
        <Submit loading={submitting}>
          {formatMessage({ id: 'userAndLogin.login.login' })}
        </Submit>
        <div className={styles.others}>
          <a href="#" className={styles.forget}>
            {formatMessage({ id: 'userAndLogin.login.forgotPassword' })}
          </a>
          <Link to="/user/register" className={styles.register}>
            {formatMessage({ id: 'userAndLogin.login.registerNewAccount' })}
          </Link>
        </div>
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
