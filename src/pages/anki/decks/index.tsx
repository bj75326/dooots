import React, { useEffect, useRef, useCallback, useLayoutEffect } from 'react';
import MainSearch from '../components/MainSearch';
import { useIntl, connect, ConnectProps, history, History } from 'umi';
import { Spin } from 'antd';
import { useInfiniteScroll } from '../utils';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { StateType } from './model';
import NewDeck from './components/NewDeck';
import DeckThumbnail from './components/DeckThumbnail';

import styles from './style.less';

interface AnkiDecksProps
  extends ConnectProps<{}, History.LocationState, { status?: string }> {
  fetchingDecks: boolean;
  deleting: boolean;
  decks: StateType['decks'];
  eof: StateType['eof'];
}

const AnkiDecks: React.FC<AnkiDecksProps> = props => {
  const { formatMessage } = useIntl();
  const bottomBoundaryRef = useRef(null);
  const page = useRef(0);
  //const startInfiniteScroll = useRef(false);
  //const forceLoading = useRef(false);
  const contentRef = useRef(null);
  const searchRef = useRef('');

  const {
    match,
    location,
    fetchingDecks,
    deleting,
    dispatch,
    decks,
    eof,
  } = props;
  console.log('match ', match);
  console.log('location ', location);

  let status = location.query.status || '';
  if (['today', 'overdue', 'unactivated'].indexOf(status) < 0) {
    status = '';
  }

  const keepStatus = useRef(status);
  keepStatus.current = status;
  const keepEof = useRef(eof);
  keepEof.current = eof;
  // const prevStatus = useRef(status);

  // if (prevStatus.current !== status) {
  //   console.log('status不一样啦');
  //   page.current = 0;
  //   prevStatus.current = status;
  //   startInfiniteScroll.current = false;
  // }

  const infiniteScrollLoading = useCallback(() => {
    page.current = page.current + 1;
    if (dispatch) {
      dispatch({
        type: 'decks/fetchDecks',
        payload: {
          status: keepStatus.current,
          page: page.current,
          search: searchRef.current,
          formatMessage,
        },
      });
    }
  }, [dispatch]);

  const handleSearch = useCallback(
    (value: string) => {
      console.log(value);
      searchRef.current = value;
      infiniteScrollLoading();
    },
    [infiniteScrollLoading],
  );

  useLayoutEffect(() => {
    if (contentRef.current) {
      ((contentRef.current as unknown) as HTMLDivElement).parentElement!.scrollTop = 0;
    }
  }, [status]);

  useEffect(() => {
    page.current = 0;
    keepEof.current = true;
    infiniteScrollLoading();
  }, [status]);

  useInfiniteScroll(
    bottomBoundaryRef,
    infiniteScrollLoading,
    //startInfiniteScroll,
    keepEof,
  );

  // useEffect(() => {
  //   console.log('run state first useEffect');
  //   page.current = 0;
  //   //startInfiniteScroll.current = false;
  //   infiniteScrollLoading();

  // }, [status]);

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
    if (
      location.query.status &&
      ['today', 'overdue', 'unactivated'].indexOf(location.query.status) >= 0
    ) {
      return location.query.status;
    }
    return 'all';
  };

  const handleTabChange = (key: string) => {
    if (match) {
      const url = match.url === '/' ? '' : match.url;
      switch (key) {
        case 'all':
          history.push(`${url}`);
          break;
        case 'today':
          history.push(`${url}?status=today`);
          break;
        case 'overdue':
          history.push(`${url}?status=overdue`);
          break;
        case 'unactivated':
          history.push(`${url}?status=unactivated`);
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
        <div className={styles.content} ref={contentRef}>
          <NewDeck />
          {decks.map(deck => (
            <DeckThumbnail deck={deck} key={deck.deckId} />
          ))}
          <div className={styles.fill} ref={bottomBoundaryRef}></div>
          {new Array(9).fill(null).map((_, index) => (
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
    decks,
  }: {
    decks: StateType;
    loading: {
      effects: {
        [key: string]: boolean;
      };
    };
  }) => ({
    decks: decks.decks,
    eof: decks.eof,
    fetchingDecks: loading.effects['decks/fetchDecks'],
    deleting: loading.effects['decks/deleteDeck'],
  }),
)(AnkiDecks);
