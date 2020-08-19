import React from 'react';
import { Link, useIntl, ConnectProps, connect } from 'umi';

export interface UserLayoutProps {}

const UserLayout: React.FC<UserLayoutProps> = props => {
  return <>UserLayout</>;
};

export default connect(() => ({}))(UserLayout);
