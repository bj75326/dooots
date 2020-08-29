import React, { Component } from 'react';
import { connect, ConnectProps } from 'umi';
import { Tag, message } from 'antd';

export interface GlobalHeaderRightProps extends Partial<ConnectProps> {
  notices?: NoticeItem[];
}

class GlobalHeaderRight extends Component<GlobalHeaderRightProps> {
  componentDidMount() {}
}
