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

  const toggleModalVisible = (): void => {
    setVisible(!visible);
  };

  const content = (
    <div className={styles.content}>
      <div className={styles.title}>
        {formatMessage({ id: 'app.settings.title' })}
      </div>
      <div className={styles.body}></div>
    </div>
  );

  return (
    <>
      <span
        className={classNames(settingButtonCls, { opened: visible })}
        onClick={toggleModalVisible}
      >
        {SettingIcon}
      </span>
      <Modal
        //title={formatMessage({ id: 'app.settings.title' })}
        visible={visible}
        onCancel={toggleModalVisible}
        footer={null}
        wrapClassName={styles.modal}
        closable={false}
      >
        {content}
      </Modal>
    </>
  );
};

export default connect(({ settings }: ConnectState) => ({}))(SettingIconView);
