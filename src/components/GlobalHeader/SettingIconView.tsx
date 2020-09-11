import React, { useState } from 'react';
import { connect, ConnectProps, formatMessage } from 'umi';
import { ConnectState } from '@/models/connect';
import classNames from 'classnames';
import { Modal, Slider, Radio } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import { fontSizeMarks as marks, colors } from '*/config/settingsConfig';

import styles from './index.less';

export interface SettingIconViewProps extends Partial<ConnectProps> {
  className?: string;
  icon?: React.ReactNode;
}

interface ColorRadioLabelProps {
  className?: string;
  fill?: string;
}

interface Color {
  name: string;
  color: string;
  icon: string;
}

const ColorRadioLabel: React.FC<ColorRadioLabelProps> = ({
  className,
  fill,
}) => {
  return (
    <svg viewBox="0 0 24 24" className={className} fill={fill}>
      <g>
        <path d="M12 22.75C6.072 22.75 1.25 17.928 1.25 12S6.072 1.25 12 1.25 22.75 6.072 22.75 12 17.928 22.75 12 22.75z"></path>
      </g>
    </svg>
  );
};

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
                step={25}
                marks={marks}
                tooltipVisible={false}
                defaultValue={25}
              />
              <span>Aa</span>
            </div>
            <label>{formatMessage({ id: 'app.settings.color' })}</label>
            <div className={classNames(styles.picker, styles.formItem)}>
              <Radio.Group>
                {colors.map((color: Color) => (
                  <div className={styles.colorGroup}>
                    <Radio.Button key={color.name} value={color.name}>
                      <ColorRadioLabel
                        className={styles.colorLabel}
                        fill={`${color.color}`}
                      />
                    </Radio.Button>
                    <span className={styles.colorIcon}>
                      <img alt={color.name} src={color.icon} />
                    </span>
                  </div>
                ))}
              </Radio.Group>
            </div>
            <label>{formatMessage({ id: 'app.settings.theme' })}</label>
            <div className={classNames(styles.picker, styles.formItem)}></div>
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
