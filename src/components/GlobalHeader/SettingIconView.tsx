import React, { useState } from 'react';
import { connect, ConnectProps } from 'umi';
import { ConnectState } from '@/models/connect';
import classNames from 'classnames';
import { Modal } from 'antd';
import { SettingOutlined } from '@ant-design/icons';

import styles from './index.less';

export interface SettingIconViewProps extends Partial<ConnectProps> {
  className?: string;
}

const SettingIconView: React.FC<SettingIconViewProps> = props => {
  const { className } = props;

  const [visible, setVisible] = useState(false);

  const settingButtonCls = classNames(className, styles.settingButton);

  return (
    <>
      <span
        className={classNames(settingButtonCls, { opened: visible })}
        onClick={() => {
          setVisible(!visible);
        }}
      >
        {SettingOutlined}
      </span>
      <Modal title={} visible={visible}></Modal>
    </>
  );
};

export default connect(({ settings }: ConnectState) => ({}))(SettingIconView);
