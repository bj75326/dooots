import React, { Component } from 'react';
import { connect, ConnectProps } from 'umi';
import { Tag, message } from 'antd';
import { ConnectState } from '@/models/connect';
import { CurrentUser } from '@/models/user';
import { NoticeItem } from '@/models/global';

export interface GlobalHeaderRightProps extends Partial<ConnectProps> {
  notices?: NoticeItem[];
  currentUser?: CurrentUser;
  fetchingNotices?: boolean;
  onNoticeVisibleChange?: (visible: boolean) => void;
  onNoticeClear?: (tabName?: string) => void;
}

class GlobalHeaderRight extends Component<GlobalHeaderRightProps> {
  componentDidMount() {
    const { dispatch } = this.props;
    if (dispatch) {
      dispatch({
        type: 'global/fetchNotices',
      });
    }
  }

  changeReadState = (clickedItem: NoticeItem): void => {
    const { id } = clickedItem;
    const { dispatch } = this.props;

    if (dispatch) {
      dispatch({
        type: 'global/changeNoticeReadState',
        payload: id,
      });
    }
  };

  handleNoticeClear = () => {};

  getNoticeData = (): {
    [key: string]: NoticeItem[];
  } => {
    const { notices = [] } = this.props;
  };

  getUnreadData = () => {};

  render() {
    const { currentUser, fetchingNotices, onNoticeVisibleChange } = this.props;
    const noticeData = this.getNoticeData();
  }
}

export default connect(({ user, global, loading }: ConnectState) => ({
  currentUser: user.currentUser,
  //fetchingMoreNotices: loading.effects['global/fetchMoreNotices'],
  fetchingNotices: loading.effects['global/fetchNotices'],
  notices: global.notices,
}));
