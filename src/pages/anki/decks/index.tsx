import React from 'react';
import MainSearch from '../components/MainSearch';
import { useIntl, connect, ConnectProps, history } from 'umi';
import { Spin } from 'antd';

import { PageHeaderWrapper } from '@ant-design/pro-layout';

import styles from './style.less';

interface AnkiDecksProps extends ConnectProps {
  fetchingDecks: boolean;
  deleting: boolean;
}

const AnkiDecks: React.FC<AnkiDecksProps> = props => {
  const { formatMessage } = useIntl();

  const handleSearch = (value: string) => {
    console.log(value);
  };

  const { children, match, location, fetchingDecks, deleting } = props;
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
      tab: formatMessage({ id: 'anki.deck&card.status.all' }),
    },
    {
      key: 'today',
      tab: formatMessage({ id: 'anki.deck&card.status.today' }),
    },
    {
      key: 'overdue',
      tab: formatMessage({ id: 'anki.deck&card.status.overdue' }),
    },
    {
      key: 'unactivated',
      tab: formatMessage({ id: 'anki.deck&card.status.unactivated' }),
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
    <Spin spinning={!!(fetchingDecks || deleting)} size="large">
      <PageHeaderWrapper
        content={mainSeach}
        tabList={tabList}
        tabActiveKey={getTabKey()}
        onTabChange={handleTabChange}
      >
        <div className={styles.content}>
          {children}
          {new Array(10).fill(null).map((_, index) => (
            <div className={styles.fill} key={`fill_${index}`}></div>
          ))}
        </div>
      </PageHeaderWrapper>
    </Spin>
  );
};

export default connect(
  ({
    loading,
  }: {
    loading: {
      effects: {
        [key: string]: boolean;
      };
    };
  }) => ({
    fetchingDecks: loading.effects['decks/fetchDecks'],
    deleting: loading.effects['decks/deleteDeck'],
  }),
)(AnkiDecks);
