import React, { useEffect, useState } from 'react';
import { Form, message, Progress, Input, Popover } from 'antd';
import { FormattedMessage, Dispatch, connect, useIntl, history } from 'umi';
import { StateType } from './model';

import styles from './style.less';

const FormItem = Form.Item;

const passwordStatusMap = {
  ok: (
    <div className={styles.success}>
      <FormattedMessage id="" />
    </div>
  ),
  pass: (
    <div className={styles.warning}>
      <FormattedMessage id="" />
    </div>
  ),
  poor: (
    <div className={styles.error}>
      <FormattedMessage id="" />
    </div>
  ),
};

const passwordProgressMap: {
  ok: 'success';
  pass: 'normal';
  poor: 'exception';
} = {
  ok: 'success',
  pass: 'normal',
  poor: 'exception',
};

interface RegisterProps {
  dispatch: Dispatch;
  userAndRegister: StateType;
  submitting: boolean;
}

export interface UserRegisterParams {
  username: string;
  password: string;
  confirm: string;
}

const Register: React.FC<RegisterProps> = ({
  submitting,
  dispatch,
  userAndRegister,
}) => {
  const [visible, setVisible]: [boolean, any] = useState(false);
  const [popover, setPopover]: [boolean, any] = useState(false);

  const confirmDirty = false;

  const [form] = Form.useForm();
  const { formatMessage } = useIntl();

  useEffect(() => {
    if (!userAndRegister) {
      return;
    }
    const account = form.getFieldValue('userName');
    if (userAndRegister.status === 'ok') {
      message.success(
        formatMessage({ id: 'userAndRegister.register.success' }),
      );
      history.push({
        pathname: '/user/register-result',
        state: {
          account,
        },
      });
    }
  }, [userAndRegister]);

  const getPasswordStatus = () => {
    const value = form.getFieldValue('password');
    if (value && value.length > 9) {
      return 'ok';
    }
    if (value && value.length > 5) {
      return 'pass';
    }
    return 'poor';
  };

  const onFinish = (values: { [key: string]: any }) => {
    dispatch({
      type: 'userAndRegister/submit',
      payload: {
        ...values,
      },
    });
  };

  const checkConfirm = (_: any, value: string) => {
    const promise = Promise;
    if (value && value !== form.getFieldValue('password')) {
      return promise.reject(
        formatMessage({ id: 'userAndRegister.password.twice' }),
      );
    }
    return promise.resolve();
  };

  const checkPassword = (_: any, value: string) => {
    const promise = Promise;
    if (!value) {
      setVisible(!!value);
      return promise.reject(
        formatMessage({ id: 'userAndRegister.password.required' }),
      );
    }
    if (!visible) {
      setVisible(!!value);
    }
    setPopover(!popover);

    if (value.length < 6) {
      return promise.reject('');
    }
    if (value && confirmDirty) {
      form.validateFields(['confirm']);
    }
    return promise.resolve();
  };

  const renderPasswordProgress = () => {
    const value = form.getFieldValue('password');
    const passwordStatus = getPasswordStatus();
    return value && value.length ? (
      <div className={styles[`progress-${passwordStatus}`]}>
        <Progress
          status={passwordProgressMap[passwordStatus]}
          className={styles.progress}
          strokeWidth={6}
          percent={value.length * 10 > 100 ? 100 : value.length * 10}
          showInfo={false}
        />
      </div>
    ) : null;
  };
  return (
    <div className={styles.main}>
      <h3>
        <FormattedMessage id="userAndRegister.register.register" />
      </h3>
      <Form form={form} name="UserRegister" onFinish={onFinish}>
        <FormItem
          name="userName"
          rules={[
            {
              required: true,
              message: formatMessage({
                id: 'userAndRegister.register.username.required',
              }),
            },
          ]}
        >
          <Input
            size="large"
            placeholder={formatMessage({
              id: 'userAndRegister.register.username.placeholder',
            })}
          />
        </FormItem>
        <Popover
          getPopupContainer={}
          content={}
          placement="right"
          visible={visible}
        >
          <FormItem
            name="password"
            className={
              form.getFieldValue('password') &&
              form.getFieldValue('password').length > 0 &&
              styles.password
            }
            rules={[
              {
                validator: checkPassword,
              },
            ]}
          ></FormItem>
        </Popover>
      </Form>
    </div>
  );
};

export default connect(
  ({
    userAndRegister,
    loading,
  }: {
    userAndRegister: StateType;
    loading: {
      effects: {
        [key: string]: boolean;
      };
    };
  }) => ({
    userAndRegister,
    submitting: loading.effects['userAndRegister/submit'],
  }),
)(Register);
