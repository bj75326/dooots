import React from 'react';
import {
  fontSizeMarks as marks,
  colors,
  themes,
  colorWeakAvailable,
  languages,
  Color,
  Theme,
  Language,
} from '*/config/settingsConfig';
import { connect, ConnectProps, formatMessage, Dispatch } from 'umi';
import { ConnectState } from '@/models/connect';
import { changeTheme, SettingModelState } from '@/models/settings';
import { Slider, Radio, Select, Switch } from 'antd';
import classNames from 'classnames';
import { CheckOutlined } from '@ant-design/icons';
import { RadioChangeEvent } from 'antd/es/radio';

import styles from './index.less';

const Option = Select.Option;

export interface SettingsFormProps extends Partial<ConnectProps> {
  settings: SettingModelState;
}

interface ColorRadioLabelProps {
  className?: string;
  fill?: string;
}

const ColorRadioLabel: React.FC<ColorRadioLabelProps> = ({
  className,
  fill,
}) => (
  <svg viewBox="0 0 24 24" className={className} fill={fill}>
    <g>
      <path d="M12 22.75C6.072 22.75 1.25 17.928 1.25 12S6.072 1.25 12 1.25 22.75 6.072 22.75 12 17.928 22.75 12 22.75z"></path>
    </g>
  </svg>
);

const SettingsForm: React.FC<SettingsFormProps> = props => {
  const { settings, dispatch } = props;
  const { theme: themeValue, primaryColor, colorWeak, fontSize } = settings;

  const onColorChange = (e: RadioChangeEvent) => {
    const primaryColor = e.target.value;
    changeTheme(
      {
        ...settings,
        primaryColor,
      },
      dispatch as Dispatch,
      formatMessage,
    );
  };

  const onThemeChange = (e: RadioChangeEvent) => {
    const theme = e.target.value;
    changeTheme(
      {
        ...settings,
        theme,
      },
      dispatch as Dispatch,
      formatMessage,
    );
  };

  return (
    <div className={styles.form}>
      {marks && (
        <>
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
        </>
      )}
      {colors && (
        <>
          <label>{formatMessage({ id: 'app.settings.color' })}</label>
          <div className={classNames(styles.colorPicker, styles.formItem)}>
            <Radio.Group value={primaryColor} onChange={onColorChange}>
              {colors.map((color: Color) => (
                <div className={styles.colorGroup} key={color.name}>
                  <Radio.Button value={color.name}>
                    <ColorRadioLabel
                      className={styles.colorLabel}
                      fill={`${color.color}`}
                    />
                  </Radio.Button>
                  {primaryColor === color.name && (
                    <CheckOutlined className={styles.colorCheckout} />
                  )}
                  <span className={styles.colorIcon}>
                    <img alt={color.name} src={color.icon} />
                  </span>
                </div>
              ))}
            </Radio.Group>
          </div>
        </>
      )}
      {themes && (
        <>
          <label>{formatMessage({ id: 'app.settings.theme' })}</label>
          <div className={classNames(styles.themePicker, styles.formItem)}>
            <Radio.Group value={themeValue} onChange={onThemeChange}>
              {themes.map((theme: Theme) => (
                <Radio
                  value={theme.value}
                  className={styles.themeGroup}
                  key={theme.value}
                >
                  {theme.name}
                  {theme.value === themeValue && (
                    <CheckOutlined className={styles.themeCheckout} />
                  )}
                </Radio>
              ))}
            </Radio.Group>
          </div>
        </>
      )}
      {(languages || colorWeakAvailable) && (
        <>
          <label>{formatMessage({ id: 'app.settings.others' })}</label>
          <div className={styles.formItem}>
            {languages && (
              <div className={classNames(styles.language, styles.otherItem)}>
                <label>{formatMessage({ id: 'app.settings.language' })}</label>
                <Select size="small">
                  {languages.map((language: Language) => (
                    <Option value={language.value}>{language.name}</Option>
                  ))}
                </Select>
              </div>
            )}
            {colorWeakAvailable && (
              <div className={classNames(styles.colorWeak, styles.otherItem)}>
                <label>{formatMessage({ id: 'app.settings.colorWeak' })}</label>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default connect(({ settings }: ConnectState) => ({
  settings,
}))(SettingsForm);
