import {} from '@ant-design/icons';
import { Badge, Spin, Tabs } from 'antd';
import React from 'react';
import NoticeList, { NoticeIconTabProps } from './NoticeList';

const { TabPane } = Tabs;

export interface NoticeIconData {
  title?: React.ReactNode;
  description?: React.ReactNode;
  datetime?: React.ReactNode;
  extra?: React.ReactNode;
  style?: React.CSSProperties;
  key?: string | number;
  read?: boolean;
}

export interface NoticeIconProps {
  count?: number;
  bell?: React.ReactNode;
  className?: string;
  loading?: boolean;
  onClear?: (tabName: string, tabKey: string) => void;
  onItemClick?: (item: NoticeIconData, tabProps: NoticeIconTabProps) => void;
  onViewMore?: (tabProps: NoticeIconTabProps, e: MouseEvent) => void;
  onTabChange?: (tabTitle: string) => void;
  style?: React.CSSProperties;
  onPopupVisibleChange?: (visible: boolean) => void;
  popupVisible?: boolean;
  clearText?: string;
  viewMoreText?: string;
  clearClose?: boolean;
  emptyImage?: string;
  children: React.ReactElement<NoticeIconTabProps>[];
}

const NoticeIcon: React.FC<NoticeIconProps> & {
  Tab: typeof NoticeList;
} = props => {
  const getNotificationBox = (): React.ReactNode => {
    const {
      children,
      loading,
      onClear,
      onTabChange,
      onItemClick,
      onViewMore,
      clearText,
      viewMoreText,
    } = props;

    if (!children) return null;

    const panes: React.ReactNode[] = [];
    React.Children.forEach(
      children,
      (child: React.ReactElement<NoticeIconTabProps>): void => {
        if (!child) {
          return;
        }
        const {
          list,
          title,
          count,
          tabKey,
          showClear,
          showViewMore,
        } = child.props;
        const len = list && list.length ? list.length : 0;
        const msgCount = count || count === 0 ? count : len;
        const tabTitle: string =
          msgCount > 0 ? `${title} (${msgCount})` : title;
        panes.push(
          <TabPane tab={tabTitle} key={tabKey}>
            <NoticeList clearText={clearText} />
          </TabPane>,
        );
      },
    );
  };
};
