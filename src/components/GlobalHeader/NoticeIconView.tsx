import React, { Component } from 'react';
import { connect, ConnectProps } from 'umi';
import { Tag, message } from 'antd';
import { ConnectState } from '@/models/connect';
import { CurrentUser } from '@/models/user';
import { NoticeItem } from '@/models/global';
import moment from 'moment';
import groupBy from 'lodash/groupBy';
import NoticeIcon from '../NoticeIcon';

import styles from './index.less';
import { MessageDescriptor } from '@ant-design/pro-layout/es/typings';

export interface GlobalHeaderRightProps extends Partial<ConnectProps> {
  notices?: NoticeItem[];
  currentUser?: CurrentUser;
  fetchingNotices?: boolean;
  onNoticeVisibleChange?: (visible: boolean) => void;
  onNoticeClear?: (tabName?: string) => void;
  formatMessage: (message: MessageDescriptor) => string;
}

class GlobalHeaderRight extends Component<GlobalHeaderRightProps> {
  componentDidMount() {
    const { dispatch } = this.props;
    // global/fetchNotices执行过程中会dispatch action给user model，这会导致一次从Authorize Wrapper向下的re-render。
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

  handleNoticeClear = (title: string, key: string) => {
    const { dispatch } = this.props;
    message.success(`${'清空了'} ${title}`);

    if (dispatch) {
      dispatch({
        type: 'global/clearNotices',
        payload: key,
      });
    }
  };

  getNoticeData = (): {
    [key: string]: NoticeItem[];
  } => {
    const { notices = [] } = this.props;

    if (!notices || notices.length === 0 || !Array.isArray(notices)) {
      return {};
    }

    const newNotices = notices.map(notice => {
      const newNotice = { ...notice };

      if (newNotice.datetime) {
        newNotice.datetime = moment(notice.datetime as string).fromNow();
      }

      if (newNotice.id) {
        newNotice.key = newNotice.id;
      }

      if (newNotice.extra && newNotice.status) {
        const color = ({
          todo: 'blue',
          overdue: 'red',
        } as { [key: string]: string })[newNotice.status];
        newNotice.extra = (
          <Tag color={color} style={{}}>
            {newNotice.extra}
          </Tag>
        );
      }

      return newNotice;
    });

    return groupBy(newNotices, 'type');
  };

  getUnreadData = (noticeData: { [key: string]: NoticeItem[] }) => {
    const unreadMsg: {
      [key: string]: number;
    } = {};
    Object.keys(noticeData).forEach(key => {
      const value = noticeData[key];

      if (!unreadMsg[key]) {
        unreadMsg[key] = 0;
      }

      if (Array.isArray(value)) {
        unreadMsg[key] = value.filter(item => !item.read).length;
      }
    });

    return unreadMsg;
  };

  render() {
    const {
      currentUser,
      fetchingNotices,
      onNoticeVisibleChange,
      formatMessage,
    } = this.props;
    const noticeData = this.getNoticeData();
    const unreadMsg = this.getUnreadData(noticeData);

    return (
      <NoticeIcon
        className={styles.action}
        count={currentUser && currentUser.unreadCount}
        onItemClick={item => {
          this.changeReadState(item as NoticeItem);
        }}
        loading={fetchingNotices}
        clearText={formatMessage({ id: 'component.noticeIcon.clear' })}
        viewMoreText={formatMessage({ id: 'component.noticeIcon.view-more' })}
        onClear={this.handleNoticeClear}
        onPopupVisibleChange={onNoticeVisibleChange}
        onViewMore={() => message.info('click on view more')}
        clearClose
      >
        <NoticeIcon.Tab
          tabKey="event"
          title={formatMessage({ id: 'component.globalHeader.event' })}
          emptyText={formatMessage({
            id: 'component.globalHeader.event.empty',
          })}
          count={unreadMsg.event}
          list={noticeData.event}
          showViewMore
        />
        <NoticeIcon.Tab
          tabKey="message"
          title={formatMessage({ id: 'component.globalHeader.message' })}
          emptyText={formatMessage({
            id: 'component.globalHeader.message.empty',
          })}
          count={unreadMsg.message}
          list={noticeData.message}
          showViewMore
        />
      </NoticeIcon>
    );
  }
}

export default connect(({ user, global, loading }: ConnectState) => ({
  currentUser: user.currentUser,
  //fetchingMoreNotices: loading.effects['global/fetchMoreNotices'],
  fetchingNotices: loading.effects['global/fetchNotices'],
  notices: global.notices,
}))(GlobalHeaderRight);
