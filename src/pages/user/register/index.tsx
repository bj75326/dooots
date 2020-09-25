import React, { useEffect, useState } from 'react';
import { Form, message } from 'antd';
import { FormattedMessage, Dispatch, connect, useIntl } from 'umi';
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

  const [form] = Form.useForm();
  const { formatMessage } = useIntl();

  useEffect(() => {
    if (!userAndRegister) {
      return;
    }
    const account = form.getFieldValue('userName');
    if (userAndRegister.status === 'ok') {
      message.success('');
    }
  }, [userAndRegister]);

  return <></>;
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
