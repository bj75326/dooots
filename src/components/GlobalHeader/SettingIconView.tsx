import React, { useState } from 'react';
import { connect, ConnectProps, formatMessage } from 'umi';
import { ConnectState } from '@/models/connect';
import classNames from 'classnames';
import { Modal } from 'antd';
import { SettingOutlined } from '@ant-design/icons';

import styles from './index.less';

export interface SettingIconViewProps extends Partial<ConnectProps> {
  className?: string;
  icon?: React.ReactNode;
}

const SettingIconView: React.FC<SettingIconViewProps> = props => {
  const { className, icon } = props;

  const [visible, setVisible] = useState(false);

  const settingButtonCls = classNames(className, styles.settingButton);
  const SettingIcon = icon || <SettingOutlined className={styles.icon} />;

  return (
    <>
      <span
        className={classNames(settingButtonCls, { opened: visible })}
        onClick={() => {
          setVisible(!visible);
        }}
      >
        {SettingIcon}
      </span>
      <Modal
        title={formatMessage({ id: 'app.settings.title' })}
        visible={visible}
      ></Modal>
    </>
  );
};

export default connect(({ settings }: ConnectState) => ({}))(SettingIconView);
