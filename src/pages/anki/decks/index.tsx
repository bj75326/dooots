import React, { useEffect } from 'react';
import MainSearch from '../components/MainSearch';
import { useIntl, connect, ConnectProps, history } from 'umi';
import NewDeck from './components/NewDeck';
import { StateType, Deck } from './model';
import { Spin } from 'antd';
import DeckThumbnail from './components/DeckThumbnail';

import { PageHeaderWrapper } from '@ant-design/pro-layout';

import styles from './style.less';

interface AnkiDecksProps extends ConnectProps {
  decks: Deck[];
  newDeckCreating: boolean;
  fetchingDecks: boolean;
  deleting: boolean;
}

const AnkiDecks: React.FC<AnkiDecksProps> = props => {
  const { formatMessage } = useIntl();

  const handleSearch = (value: string) => {
    console.log(value);
  };

  const { children, match, location } = props;
  console.log('match ', match);
  console.log('location ', location);

  const mainSeach = (
    <MainSearch
      placeholder={formatMessage({
        id: 'anki.search.deck.placeholder',
      })}
      onSearch={handleSearch}
    />
  );

  const tabList = [
    {
      key: 'all',
      tab: '所有状态',
    },
    {
      key: 'today',
      tab: '今日份',
    },
    {
      key: 'overdue',
      tab: '已逾期',
    },
    {
      key: 'unactivated',
      tab: '未激活',
    },
  ];

  const getTabKey = () => {
    const url = match!.path === '/' ? '' : match!.path;
    const tabKey = location.pathname.replace(`${url}/`, '');
    if (tabKey && tabKey !== '/') {
      return tabKey;
    }
    return 'all';
  };

  const handleTabChange = (key: string) => {
    if (match) {
      const url = match.url === '/' ? '' : match.url;
      switch (key) {
        case 'all':
          history.push(`${url}/all`);
          break;
        case 'today':
          history.push(`${url}/today`);
          break;
        case 'overdue':
          history.push(`${url}/overdue`);
          break;
        case 'unactivated':
          history.push(`${url}/unactivated`);
          break;
        default:
          break;
      }
    }
  };

  return (
    <PageHeaderWrapper
      content={mainSeach}
      tabList={tabList}
      tabActiveKey={getTabKey()}
      onTabChange={handleTabChange}
    >
      <Spin spinning={false} size="large">
        <div className={styles.content}>
          {children}
          {new Array(10).fill(null).map((_, index) => (
            <div className={styles.fill} key={`fill_${index}`}></div>
          ))}
        </div>
      </Spin>
    </PageHeaderWrapper>
  );
};

export default connect(
  ({
    decks,
    loading,
  }: {
    decks: StateType;
    loading: {
      effects: {
        [key: string]: boolean;
      };
    };
  }) => ({
    decks: decks.decks,

    newDeckCreating: loading.effects['decks/addDeck'],
    fetchingDecks: loading.effects['decks/fetchDecks'],
    deleting: loading.effects['decks/deleteDeck'],
  }),
)(AnkiDecks);
