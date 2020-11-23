import { Reducer, Dispatch } from 'umi';
import { message } from 'antd';

export interface SettingModelState {
  /**
   * main theme
   */
  theme: 'light' | 'dark';
  /**
   * primary color
   */
  primaryColor: 'default' | 'star' | 'blossom' | 'octopus' | 'fire' | 'avocado';
  /**
   * colorWeak
   */
  colorWeak: boolean;
  /**
   * fontSize
   */
  fontSize: number;
}

export const getColor = (
  primaryColor: SettingModelState['primaryColor'],
): string => {
  switch (primaryColor) {
    case 'star':
      return '#FFAD1F';
    case 'blossom':
      return '#E0245E';
    case 'octopus':
      return '#794BC4';
    case 'fire':
      return '#F45D22';
    case 'avocado':
      return '#17BF63';
    default:
      return '#1890ff';
  }
};

const localTheme = localStorage.getItem('theme') || 'light';
const localColor = localStorage.getItem('color') || 'default';
const localFontSize = localStorage.getItem('fontSize') || '14';
const localColorWeak = localStorage.getItem('colorWeak') || '0';

export const defaultSettings: SettingModelState = {
  theme: localTheme as SettingModelState['theme'],
  primaryColor: localColor as SettingModelState['primaryColor'],
  colorWeak: localColorWeak === '1' ? true : false,
  fontSize: +localFontSize,
};

export interface SettingModelType {
  namespace: 'settings';
  state: SettingModelState;
  reducers: {
    changeSetting: Reducer<SettingModelState>;
  };
}

export const changeTheme = (
  { theme, primaryColor }: SettingModelState,
  dispatch: Dispatch,
  formatMessage: any,
) => {
  let hide: any = () => null;
  hide = message.loading(
    formatMessage({
      id: 'app.settings.loading',
      defaultMessage: '正在加载主题',
    }),
  );
  //setCookie('_theme', theme);
  //setCookie('_color', primaryColor);
  localStorage.setItem('theme', theme);
  localStorage.setItem('color', primaryColor);

  let styleLink: HTMLElement | null = document.getElementById('theme-style');
  let body = document.getElementsByTagName('body')[0];
  let preStyleLink: HTMLElement | null = null;

  if (styleLink) {
    styleLink.id = 'pre-theme-style';
    preStyleLink = styleLink;
  }

  styleLink = document.createElement('link');
  styleLink.type = 'text/css';
  styleLink.rel = 'stylesheet';
  styleLink.id = 'theme-style';
  // document.body.append(styleLink);
  if (document.body.append) {
    document.body.append(styleLink);
  } else {
    document.body.appendChild(styleLink);
  }

  if (theme === 'light') {
    if (primaryColor === 'default') {
      styleLink.href = '';
      body.className = 'body-wrap-default';
    } else {
      styleLink.href = `/theme/${primaryColor}.css`;
      body.className = `body-wrap-${primaryColor}`;
    }
  } else if (theme === 'dark') {
    if (primaryColor === 'default') {
      styleLink.href = '/theme/dark.css';
      body.className = 'body-wrap-dark';
    } else {
      styleLink.href = `/theme/dark-${primaryColor}.css`;
      body.className = `dark body-wrap-dark-${primaryColor}`;
    }
  }

  if (theme === 'light' && primaryColor === 'default') {
    if (preStyleLink) document.body.removeChild(preStyleLink);
    dispatch({
      type: 'settings/changeSetting',
      payload: {
        theme,
        primaryColor,
      },
    });
    setTimeout(() => {
      hide();
    });
  } else {
    styleLink.onload = () => {
      if (preStyleLink) document.body.removeChild(preStyleLink);
      dispatch({
        type: 'settings/changeSetting',
        payload: {
          theme,
          primaryColor,
        },
      });
      setTimeout(() => {
        hide();
      });
    };
  }
};

const SettingModel: SettingModelType = {
  namespace: 'settings',
  state: defaultSettings,
  reducers: {
    changeSetting(state = defaultSettings, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};

export default SettingModel;
