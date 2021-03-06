import { MenuDataItem } from '@ant-design/pro-layout';
import { GlobalModelState } from './global';
import { SettingModelState } from './settings';
import { UserModelState } from './user';
import { StateType } from './login';

export { GlobalModelState, SettingModelState, UserModelState };

export interface Loading {
  global: boolean;
  effects: { [key: string]: boolean | undefined };
  models: {
    global?: boolean;
    menu?: boolean;
    setting?: boolean;
    user?: boolean;
    login?: boolean;
  };
}

export interface ConnectState {
  global: GlobalModelState;
  loading: Loading;
  settings: SettingModelState;
  user: UserModelState;
  login: StateType;
}

export type Settings = SettingModelState;

export interface Route extends MenuDataItem {
  routes?: Route[];
}
