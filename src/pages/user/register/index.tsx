import React, { useEffect, useState } from 'react';
import { Form, message, Progress, Input, Popover, Button } from 'antd';
import {
  FormattedMessage,
  Dispatch,
  connect,
  useIntl,
  history,
  Link,
} from 'umi';
import { StateType } from './model';

import styles from './style.less';

const FormItem = Form.Item;

const passwordStatusMap = {
  ok: (
    <div className={styles.success}>
      <FormattedMessage id="userAndRegister.strength.strong" />
    </div>
  ),
  pass: (
    <div className={styles.warning}>
      <FormattedMessage id="userAndRegister.strength.medium" />
    </div>
  ),
  poor: (
    <div className={styles.error}>
      <FormattedMessage id="userAndRegister.strength.short" />
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

const userNameRegExp = /(^(?:[\u4e00-\u9fa5]+)(?:·[\u4e00-\u9fa5]+)*$)|(^[a-zA-Z]+[\.\-\_a-zA-Z]{0,1}[a-zA-Z]+$)/;

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
  const [userNamePopover, setUserNamePopover]: [boolean, any] = useState(false);

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

  const checkUserNameFormat = (_: any, value: string) => {
    const promise = Promise;
    setUserNamePopover(false);
    if (!value) {
      return promise.reject(
        formatMessage({ id: 'userAndRegister.register.username.required' }),
      );
    }
    if (!userNameRegExp.test(value)) {
      setUserNamePopover(true);
      return promise.reject(
        formatMessage({ id: 'userAndRegister.username.format.error' }),
      );
    }
    return promise.resolve();
  };

  // const checkUserNameUnique = (_: any, value: string) => {
  //   if (value) {
  //     const promise = new Promise((resolve, reject) => {
  //       dispatch({
  //         type: 'userAndRegister/checkNameUnique',
  //         payload: {
  //           username: value,
  //           resolve,
  //           reject,
  //           formatMessage,
  //         },
  //       });
  //     });
  //     return promise as Promise<void>;
  //   }
  //   return Promise.reject(
  //     formatMessage({ id: 'userAndRegister.register.username.required' }),
  //   );
  // };

  const checkUserNameUnique = (_: any, value: string) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject('test');
      }, 3000);
    });
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

  const handleFieldsChange = (changedField, allFields) => {
    console.log('changedField: ', changedField);
    console.log('allFields: ', allFields);
    console.log(form.isFieldValidating('userName'));
  };

  return (
    <div className={styles.main}>
      <Form
        form={form}
        name="UserRegister"
        onFinish={onFinish}
        layout="vertical"
        requiredMark={false}
        onFieldsChange={handleFieldsChange}
      >
        <Popover
          getPopupContainer={node => {
            if (node && node.parentNode) {
              return node.parentNode as HTMLElement;
            }
            return node;
          }}
          content={
            <div>
              {formatMessage({
                id: 'userAndRegister.register.username.format',
              })}
            </div>
          }
          overlayStyle={{ width: 240 }}
          align={{
            points: ['cl', 'tr'],
            offset: [0, 55],
          }}
          visible={userNamePopover}
          overlayClassName={styles.popover}
        >
          <FormItem
            name="userName"
            label={formatMessage({ id: 'userAndRegister.register.username' })}
            validateFirst
            validateTrigger={['onChange', 'onBlur']}
            rules={[
              {
                validator: checkUserNameFormat,
                validateTrigger: ['onChange', 'onBlur'],
              },
              {
                validator: checkUserNameUnique,
                validateTrigger: 'onBlur',
              },
            ]}
            hasFeedback
            className={styles.userName}
          >
            <Input
              size="large"
              placeholder={formatMessage({
                id: 'userAndRegister.register.username.placeholder',
              })}
              autoComplete="off"
            />
          </FormItem>
        </Popover>
        <Popover
          getPopupContainer={node => {
            if (node && node.parentNode) {
              return node.parentNode as HTMLElement;
            }
            return node;
          }}
          content={
            visible && (
              <div style={{}}>
                {passwordStatusMap[getPasswordStatus()]}
                {renderPasswordProgress()}
                <div style={{}}>
                  <FormattedMessage id="userAndRegister.strength.msg" />
                </div>
              </div>
            )
          }
          overlayStyle={{ width: 240 }}
          align={{
            points: ['cl', 'tr'],
            offset: [0, 55],
          }}
          visible={visible}
          overlayClassName={styles.popover}
        >
          <FormItem
            name="password"
            label={formatMessage({ id: 'userAndRegister.register.password' })}
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
          >
            <Input
              size="large"
              type="password"
              placeholder={formatMessage({
                id: 'userAndRegister.register.password.placeholder',
              })}
            />
          </FormItem>
        </Popover>
        <FormItem
          name="confirm"
          label={formatMessage({ id: 'userAndRegister.register.confirm' })}
          rules={[
            {
              required: true,
              message: formatMessage({
                id: 'userAndRegister.register.confirm.required',
              }),
            },
            {
              validator: checkConfirm,
            },
          ]}
        >
          <Input
            size="large"
            type="password"
            placeholder={formatMessage({
              id: 'userAndRegister.register.confirm.placeholder',
            })}
          />
        </FormItem>
        <FormItem>
          <Button
            size="large"
            loading={submitting}
            className={styles.submit}
            type="primary"
            htmlType="submit"
          >
            {formatMessage({ id: 'userAndRegister.register.register' })}
          </Button>
          <Link to="/user/login" className={styles.login}>
            {formatMessage({ id: 'userAndRegister.register.login' })}
          </Link>
        </FormItem>
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
