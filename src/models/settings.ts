import { Reducer } from 'umi';

export interface SettingModelState {}

export interface SettingModelType {
  namespace: 'settings';
  state: SettingModelState;
  reducers: {};
}

const SettingModel: SettingModelType = {
  namespace: 'settings',
  state: {},
  reducers: {
    changeSetting(state, { payload }) {
      //todo

      return {
        ...state,
        ...payload,
      };
    },
  },
};

export default SettingModel;
