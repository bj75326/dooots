import React, { useState } from 'react';
import { connect, ConnectProps, formatMessage } from 'umi';
import { ConnectState } from '@/models/connect';
import classNames from 'classnames';
import { Modal, Slider } from 'antd';
import { SettingOutlined } from '@ant-design/icons';

import styles from './index.less';

export interface SettingIconViewProps extends Partial<ConnectProps> {
  className?: string;
  icon?: React.ReactNode;
}

const marks = {
  0: 1,
  25: 2,
  50: 3,
  75: 4,
  100: 5,
};

const colors = ['default', 'star', 'blossom', 'octopus', 'fire', 'avocado'];

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
      <h2 className={styles.title}>
        {formatMessage({ id: 'app.settings.title' })}
      </h2>
      <div className={styles.scroll}>
        <div className={styles.subtitle}>
          {formatMessage({ id: 'app.settings.subtitle' })}
        </div>
        <div className={styles.body}>
          <div className={styles.sample}>
            <h3>计算机网络的五层模型，IP、TCP、HTTP用在哪一层？</h3>
            <h4>应用层</h4>
            <div>
              应用层是整个层次最顶层，直接和最原始数据打交道，定义的是应用进程间通信和交互的规则。这是什么意思？因为两台电脑通讯就是发送方把数据传给接收方，虽然发送方知道自己...
            </div>
            <h4>运输层</h4>
            <div>
              负责向两个主机中进程之间的通信提供通用数据服务，“传输层”的功能，就是建立”端口到端口”的通...
            </div>
            <div></div>
          </div>
          <div className={styles.form}>
            <label>{formatMessage({ id: 'app.settings.fontSize' })}</label>
            <div className={classNames(styles.slider, styles.formItem)}>
              <span>Aa</span>
              <Slider
                step={null}
                marks={marks}
                tooltipVisible={false}
                defaultValue={25}
              />
              <span>Aa</span>
            </div>
            <label>{formatMessage({ id: 'app.settings.color' })}</label>
            <div className={classNames(styles.picker, styles.formItem)}>
              {colors.map(color => (
                <div key={color} className={color}></div>
              ))}
            </div>
            <label>{formatMessage({ id: 'app.settings.theme' })}</label>
          </div>
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
        //title={formatMessage({ id: 'app.settings.title' })}
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

export default connect(({ settings }: ConnectState) => ({}))(SettingIconView);
