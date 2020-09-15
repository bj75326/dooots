import React, { useState } from 'react';
import { useIntl } from 'umi';
import classNames from 'classnames';
import { Modal } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import SettingsForm from '@/components/SettingsForm';

import styles from './index.less';

export interface SettingIconViewProps {
  className?: string;
  icon?: React.ReactNode;
}

const Example: React.FC<{ className?: string }> = ({ className }) => {
  const { formatMessage } = useIntl();

  return (
    <div className={className}>
      <h3>{formatMessage({ id: 'app.settings.sample.title' })}</h3>
      <h4>{formatMessage({ id: 'app.settings.sample.subtitle#1' })}</h4>
      <div>{formatMessage({ id: 'app.settings.sample.section#1' })}</div>
      <h4>{formatMessage({ id: 'app.settings.sample.subtitle#2' })}</h4>
      <div>{formatMessage({ id: 'app.settings.sample.section#2' })}</div>
      <h4>{formatMessage({ id: 'app.settings.sample.subtitle#3' })}</h4>
      <div>{formatMessage({ id: 'app.settings.sample.section#3' })}</div>
    </div>
  );
};

const SettingIconView: React.FC<SettingIconViewProps> = props => {
  const { className, icon } = props;

  const { formatMessage } = useIntl();

  const [visible, setVisible] = useState(false);

  const settingButtonCls = classNames(className, styles.settingButton);
  const SettingIcon = icon || <SettingOutlined className={styles.icon} />;

  const toggleModalVisible = (): void => {
    setVisible(!visible);
  };

  const content = (
    <div className={styles.content}>
      <h2 className={styles.title}>
        {formatMessage({ id: 'app.settings.title' })}
      </h2>
      <div className={styles.scroll}>
        <div className={styles.subtitle}>
          {formatMessage({ id: 'app.settings.subtitle' })}
        </div>
        <div className={styles.body}>
          <Example className={styles.sample} />
          <SettingsForm />
        </div>
      </div>
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
        visible={visible}
        onCancel={toggleModalVisible}
        footer={null}
        wrapClassName={styles.modal}
        width={900}
        closable={false}
      >
        {content}
      </Modal>
    </>
  );
};

export default SettingIconView;
