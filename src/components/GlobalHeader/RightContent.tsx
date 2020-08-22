import { Tooltip } from 'antd';
import {} from '@ant-design/icons';
import React from 'react';
import { connect, ConnectProps } from 'umi';
import { ConnectState } from '@/models/connect';

import styles from './index.less';

export type Theme = 'light' | 'dark';

export interface GlobalHeaderRightProps extends Partical<ConnectProps> {
  theme?: Theme;
}

const GlobalHeaderRight: React.SFC<GlobalHeaderRightProps> = props => {
  const { theme } = props;

  let className = styles.right;
};

export default connect(({ settings }: ConnectState) => ({
  theme: settings.theme,
}))(GlobalHeaderRight);
