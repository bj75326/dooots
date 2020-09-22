import React, { useState } from 'react';
import { Form } from 'antd';
import { LoginParamsType } from '../../service';
import { FormInstance } from 'antd/es/form';
import LoginSubmit from './LoginSubmit';
import LoginItem, { LoginItemProps } from './LoginItem';
import LoginContext from './LoginContext';
import classNames from 'classnames';

import styles from './index.less';

export interface LoginProps {
  style?: React.CSSProperties;
  onSubmit?: (values: LoginParamsType) => void;
  className?: string;
  form?: FormInstance;
  children: React.ReactElement[];
}

interface LoginType extends React.FC<LoginProps> {
  Submit: typeof LoginSubmit;
  UserName: React.FC<LoginItemProps>;
  Password: React.FC<LoginItemProps>;
}

const Login: LoginType = props => {
  const { className } = props;

  return (
    <LoginContext.Provider
      value={{
        updateActive: () => {},
      }}
    >
      <div className={classNames(className, styles.login)}>
        <Form
          layout="vertical"
          requiredMark={false}
          form={props.form}
          onFinish={values => {
            if (props.onSubmit) {
              props.onSubmit(values as LoginParamsType);
            }
          }}
        >
          {props.children}
        </Form>
      </div>
    </LoginContext.Provider>
  );
};

Login.Submit = LoginSubmit;
Login.UserName = LoginItem.UserName;
Login.Password = LoginItem.Password;

export default Login;
