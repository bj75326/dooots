import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
} from 'react';
import MainSearch from '../components/MainSearch';
import { useIntl, connect, ConnectProps } from 'umi';
import NewCard from './components/NewCard';
import { Button, Spin, Modal } from 'antd';
import {
  FilterOutlined,
  AimOutlined,
  RedoOutlined,
  DeleteOutlined,
  DownloadOutlined,
} from '@ant-design/icons';
import Animate from 'rc-animate';
import { StateType, Card } from './model';
import CardThumbnail from './components/CardThumbnail';
import Filter from './components/Filter';

import styles from './style.less';

interface AnkiDeckProps extends ConnectProps {
  deck: StateType['deck'];
  cards: Card[];
  eof: boolean;
  fetchingDeck: boolean;
  resetingCards: boolean;
  deletingCards: boolean;
}

const AnkiDeck: React.FC<AnkiDeckProps> = props => {
  const { formatMessage } = useIntl();

  const [filterCollapsed, setFilterCollapsed]: [boolean, any] = useState(true);

  const [batchMode, setBatchMode] = useState(false);

  const [selectedCards, setSelectedCards]: [
    {
      deckId: string;
      cardId: string;
    }[],
    any,
  ] = useState([]);

  const [bRModalVisible, setBRModalVisible]: [boolean, any] = useState(false);
  const [bDltModalVisible, setBDltModalVisible]: [boolean, any] = useState(
    false,
  );

  const {
    dispatch,
    cards,
    deck,
    eof,
    location,
    match,
    fetchingDeck,
    resetingCards,
    deletingCards,
  } = props;

  const searchRef = useRef('');

  const handleSearch = useCallback(
    (value: string) => {
      console.log(value);
      searchRef.current = value;
      searchCards();
      // todo search
    },
    [dispatch],
  );

  const searchCards = useCallback(() => {
    console.log('search: ', searchRef.current);
    if (dispatch) {
      dispatch({
        type: 'deck/fetchCards',
        payload: {
          search: searchRef.current,
        },
      });
    }
  }, [dispatch]);

  const toggleFilter = () => {
    setFilterCollapsed((filterCollapsed: boolean) => !filterCollapsed);
  };

  const toggleBatchMode = () => {
    setBatchMode((batchMode: boolean) => !batchMode);
    setSelectedCards([]);
  };

  const handleSelect = useCallback(
    (card: { deckId: string; cardId: string }) => {
      //todo
      const selected: { deckId: string; cardId: string }[] = [];
      const unselected: { deckId: string; cardId: string }[] = [];
      selectedCards.forEach((c: { deckId: string; cardId: string }) => {
        if (c.deckId === card.deckId && c.cardId === card.cardId) {
          selected.push(c);
        } else {
          unselected.push(c);
        }
      });
      if (selected.length <= 0) {
        setSelectedCards(
          (selectedCards: { deckId: string; cardId: string }[]) => [
            ...selectedCards,
            card,
          ],
        );
      } else {
        setSelectedCards(unselected);
      }
    },
    [selectedCards],
  );

  const extra = (
    <>
      <Button
        type="primary"
        shape="circle"
        className={styles.searchExtra}
        onClick={toggleBatchMode}
      >
        <AimOutlined />
      </Button>
      <Button
        type="primary"
        shape="circle"
        className={styles.searchExtra}
        onClick={toggleFilter}
      >
        <FilterOutlined />
      </Button>
    </>
  );

  const getFooterElement = (onCancel: any, onConfirm: any) => (
    <div>
      <Button shape="round" onClick={onCancel}>
        {formatMessage({ id: 'app.common.cancel' })}
      </Button>
      <Button shape="round" type="primary" onClick={onConfirm}>
        {formatMessage({ id: 'app.common.confirm' })}
      </Button>
    </div>
  );

  const handleBRBtnClick = () => {
    setBRModalVisible((bRModalVisible: boolean) => !bRModalVisible);
  };

  const handleBDltBtnClick = () => {
    setBDltModalVisible((bDltModalVisible: boolean) => !bDltModalVisible);
  };

  const handleBatchReset = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      if (dispatch) {
        dispatch({
          type: 'deck/resetCards',
          payload: {
            cards: selectedCards,
            formatMessage,
          },
        });
      }
      setBRModalVisible(false);
      setBatchMode(false);
    },
    [dispatch, selectedCards, formatMessage, setBRModalVisible, setBatchMode],
  );

  const handleBatchDownload = () => {};

  const handleBatchDelete = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      if (dispatch) {
        dispatch({
          type: 'deck/deleteCards',
          payload: {
            cards: selectedCards,
            formatMessage,
          },
        });
        setBDltModalVisible(false);
        setBatchMode(false);
      }
    },
    [dispatch, selectedCards, formatMessage, setBDltModalVisible, setBatchMode],
  );

  const batchBtnsDisabled = selectedCards.length === 0;

  useEffect(() => {
    if (dispatch && match) {
      dispatch({
        type: 'deck/fetchDeck',
        payload: {
          deckId: (match.params as { deck: string }).deck,
        },
      });
    }
  }, [dispatch, match]);

  return (
    <Spin
      spinning={fetchingDeck || resetingCards || deletingCards}
      size="large"
    >
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <MainSearch
            placeholder={formatMessage({ id: 'anki.search.card.placeholder' })}
            onSearch={handleSearch}
            extra={extra}
          />
          <Animate showProp={'visible'} transitionName="collapsed" component="">
            <Filter visible={!filterCollapsed} search={searchRef} />
          </Animate>
          {batchMode && (
            <div className={styles.batchBtns}>
              <Button
                shape="circle"
                onClick={handleBRBtnClick}
                type="primary"
                disabled={batchBtnsDisabled}
              >
                <RedoOutlined />
              </Button>
              <Modal
                visible={bRModalVisible}
                width={280}
                closable={false}
                title={formatMessage({
                  id: 'anki.deck.reset.modal.title',
                })}
                onCancel={handleBRBtnClick}
                footer={getFooterElement(handleBRBtnClick, handleBatchReset)}
              >
                <div className={styles.modalContent}>
                  {formatMessage({ id: 'anki.deck.reset.modal.content' })}
                </div>
              </Modal>
              <Button
                shape="circle"
                onClick={handleBatchDownload}
                type="primary"
                disabled={batchBtnsDisabled}
              >
                <DownloadOutlined />
              </Button>
              <Button
                shape="circle"
                danger
                type="primary"
                onClick={handleBDltBtnClick}
                disabled={batchBtnsDisabled}
              >
                <DeleteOutlined />
              </Button>
              <Modal
                visible={bDltModalVisible}
                width={280}
                closable={false}
                title={formatMessage({
                  id: 'anki.deck.delete.modal.title',
                })}
                onCancel={handleBDltBtnClick}
                footer={getFooterElement(handleBDltBtnClick, handleBatchDelete)}
              >
                <div className={styles.modalContent}>
                  {formatMessage({
                    id: 'anki.deck.delete.modal.content',
                  })}
                </div>
              </Modal>
            </div>
          )}
        </div>

        <div className={styles.content}>
          <div className={styles.cards}>
            <NewCard />
            {cards.map((card: Card) => (
              <CardThumbnail
                card={card}
                key={card.cardId}
                selectable={batchMode}
                selected={
                  !!selectedCards.find(
                    (c: { deckId: string; cardId: string }) =>
                      c.deckId === card.deckId && c.cardId === card.cardId,
                  )
                }
                onSelect={handleSelect}
              />
            ))}
            {new Array(9).fill(undefined).map((_, key) => (
              <div className={styles.fill} key={`fill_${key}`}></div>
            ))}
          </div>
        </div>
      </div>
    </Spin>
  );
};

export default connect(
  ({
    deck,
    loading,
  }: {
    deck: StateType;
    loading: { effects: { [key: string]: boolean } };
  }) => ({
    deck: deck.deck,
    cards: deck.cards,
    eof: deck.eof,
    fetchingDeck: !!loading.effects['deck/fetchDeck'],
    resetingCards: !!loading.effects['deck/resetCards'],
    deletingCards: !!loading.effects['deck/deleteCards'],
  }),
)(AnkiDeck);
