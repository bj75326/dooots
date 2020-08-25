import { Reducer } from 'umi';

export interface SettingModelState {
  /**
   * main theme
   */
  theme: 'light' | 'dark';
  /**
   * primary color
   */
  primaryColor: string;
  /**
   * colorWeak
   */
  colorWeak: boolean;
  /**
   * fontSize
   */
  fontSize: number;
}

export const defaultSettings: SettingModelState = {
  theme: 'light',
  primaryColor: '#1890ff',
  colorWeak: false,
  fontSize: 14,
};

export interface SettingModelType {
  namespace: 'settings';
  state: SettingModelState;
  reducers: {
    changeSetting: Reducer<SettingModelState>;
  };
}

const changeTheme = (theme: 'light' | 'dark') => {
  let styleLink = document.getElementById('theme-style');
  let body = document.getElementsByTagName('body')[0];
  if (styleLink) {
    if (theme === 'dark') {
      styleLink.href = '/theme/dark.css';
    } else {
      styleLink.href = '';
    }
  } else {
    styleLink = document.createElement('link');
    styleLink.type = 'text/css';
    styleLink.rel = 'stylesheet';
    styleLink.id = 'theme-style';
    if (theme === 'dark') {
      styleLink.href = '/theme/dark.css';
    } else {
      styleLink.href = '';
    }
    document.body.append(styleLink);
  }
};

const SettingModel: SettingModelType = {
  namespace: 'settings',
  state: defaultSettings,
  reducers: {
    changeSetting(state = defaultSettings, { payload }) {
      const { theme } = payload;

      changeTheme(theme);

      return {
        ...state,
        ...payload,
      };
    },
  },
};

export default SettingModel;
