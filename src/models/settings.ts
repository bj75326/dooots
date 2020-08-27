import { Effect, Reducer, useDispatch } from 'umi';

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

export const defaultSettings: SettingModelState = {
  theme: 'light',
  primaryColor: 'default',
  colorWeak: false,
  fontSize: 14,
};

export interface SettingModelType {
  namespace: 'settings';
  state: SettingModelState;
  effects: {
    changeTheme: Effect;
  };
  reducers: {
    changeSetting: Reducer<SettingModelState>;
  };
}

const changeTheme = ({ theme, primaryColor }: SettingModelState) => {
  let styleLink = document.getElementById('theme-style');
  let body = document.getElementsByTagName('body')[0];
  /*
  if (!styleLink) {
    styleLink = document.createElement('link');
    styleLink.type = 'text/css';
    styleLink.rel = 'stylesheet';
    styleLink.id = 'theme-style';
    document.body.append(styleLink);
  }*/

  if (styleLink) document.body.removeChild(styleLink);

  styleLink = document.createElement('link');
  styleLink.type = 'text/css';
  styleLink.rel = 'stylesheet';
  styleLink.id = 'theme-style';
  document.body.append(styleLink);

  if (theme === 'light') {
    if (primaryColor === 'default') {
      styleLink.href = '';
      body.className = 'body-wrap-default';
    } else if (primaryColor === 'star') {
      styleLink.href = '/theme/star.css';
      body.className = 'body-wrap-star';
    } else if (primaryColor === 'blossom') {
      styleLink.href = '/theme/blossom.css';
      body.className = 'body-wrap-blossom';
    } else if (primaryColor === 'octopus') {
      styleLink.href = '/theme/octopus.css';
      body.className = 'body-wrap-octopus';
    } else if (primaryColor === 'fire') {
      styleLink.href = '/theme/fire.css';
      body.className = 'body-wrap-fire';
    } else if (primaryColor === 'avocado') {
      styleLink.href = '/theme/avocado.css';
      body.className = 'body-wrap-avocado';
    }
  } else if (theme === 'dark') {
    if (primaryColor === 'default') {
      styleLink.href = '/theme/dark.css';
      body.className = 'body-wrap-dark';
    } else if (primaryColor === 'star') {
      styleLink.href = '/theme/dark-star.css';
      body.className = 'body-wrap-dark-star';
    } else if (primaryColor === 'blossom') {
      styleLink.href = '/theme/dark-blossom.css';
      body.className = 'body-wrap-dark-blossom';
    } else if (primaryColor === 'octopus') {
      styleLink.href = '/theme/dark-octopus.css';
      body.className = 'body-wrap-dark-octopus';
    } else if (primaryColor === 'fire') {
      styleLink.href = '/theme/dark-fire.css';
      body.className = 'body-wrap-dark-fire';
    } else if (primaryColor === 'avocado') {
      styleLink.href = '/theme/dark-avocado.css';
      body.className = 'body-wrap-dark-avocado';
    }
  }

  styleLink.onload = () => {
    console.log('onload test');
  };
};

const SettingModel: SettingModelType = {
  namespace: 'settings',
  state: defaultSettings,
  effects: {
    *changeTheme({ payload }, { call, put }) {},
  },
  reducers: {
    changeSetting(state = defaultSettings, { payload }) {
      changeTheme({
        ...state,
        ...payload,
      });

      return {
        ...state,
        ...payload,
      };
    },
  },
};

export default SettingModel;
