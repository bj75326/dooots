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
}

export const defaultSettings: SettingModelState = {
  theme: 'light',
  primaryColor: '#1890ff',
  colorWeak: false,
};

export interface SettingModelType {
  namespace: 'settings';
  state: SettingModelState;
  reducers: {};
}

const SettingModel: SettingModelType = {
  namespace: 'settings',
  state: defaultSettings,
  reducers: {
    changeSetting(state = defaultSettings, { payload }) {
      //todo

      return {
        ...state,
        ...payload,
      };
    },
  },
};

export default SettingModel;
