import React, { useEffect, useState, useRef, useCallback } from 'react';
import MainSearch from '../components/MainSearch';
import { useIntl, connect, ConnectProps, Dispatch } from 'umi';
import NewCard from './components/NewCard';
import { Form, Select, Row, Col, Space, Button, Spin } from 'antd';
import { FilterOutlined, AimOutlined } from '@ant-design/icons';
import Animate from 'rc-animate';
import { StateType, Card } from './model';
import CardThumbnail from './components/CardThumbnail';

import styles from './style.less';

const { Option } = Select;

interface AnkiDeckProps extends ConnectProps {
  deck: StateType['deck'];
  cards: Card[];
  eof: boolean;
  fetchingDeck: boolean;
}

interface FilterProps {
  visible: boolean;
  search: { current: string };
  dispatch: Dispatch;
}

const Filter: React.FC<FilterProps> = props => {
  const form = Form.useForm()[0];
  const { visible, dispatch, search } = props;
  const { formatMessage } = useIntl();

  console.log('search in filter: ', search);

  const filterCards = useCallback(() => {
    dispatch({
      type: 'deck/fetchCards',
      payload: {
        search: search.current,
        status: form.getFieldValue('status'),
        rate: form.getFieldValue('rate'),
        tags: form.getFieldValue('tags'),
      },
    });
  }, [dispatch, form]);

  const handleReset = useCallback(() => {
    form.resetFields();
    search.current = '';
    filterCards();
  }, [form, filterCards]);

  const handleSubmit = useCallback(() => {
    filterCards();
  }, [filterCards]);

  return (
    <div
      className={styles.filter}
      style={{ display: visible ? 'flex' : 'none' }}
    >
      <Form
        form={form}
        name="deckFilter"
        className={styles.form}
        initialValues={{
          status: 'all',
          rate: 'all',
          tags: [],
        }}
      >
        <Row gutter={16}>
          <Col span={6}>
            <Form.Item
              name="status"
              label={formatMessage({ id: 'anki.deck.filter.status.label' })}
              labelCol={{ flex: '0 0 90px' }}
            >
              <Select>
                <Option value="all">
                  {formatMessage({ id: 'anki.deck&card.status.all' })}
                </Option>
                <Option value="underway">
                  {formatMessage({ id: 'anki.deck&card.status.underway' })}
                </Option>
                <Option value="overdue">
                  {formatMessage({ id: 'anki.deck&card.status.overdue' })}
                </Option>
                <Option value="unactivated">
                  {formatMessage({ id: 'anki.deck&card.status.unactivated' })}
                </Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              name="rate"
              label={formatMessage({ id: 'anki.deck.filter.rate.label' })}
              labelCol={{ flex: '0 0 90px' }}
            >
              <Select>
                <Option value="all">
                  {formatMessage({ id: 'anki.deck.filter.rate.all' })}
                </Option>
                <Option value="4">
                  {formatMessage({ id: 'anki.deck.filter.rate.underFour' })}
                </Option>
                <Option value="3">
                  {formatMessage({ id: 'anki.deck.filter.rate.underThree' })}
                </Option>
                <Option value="2">
                  {formatMessage({ id: 'anki.deck.filter.rate.underTwo' })}
                </Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="tags"
              label={formatMessage({ id: 'anki.deck.filter.tags' })}
              labelCol={{ flex: '0 0 90px' }}
            >
              <Select mode="tags">
                <Spin spinning={true}>
                  <Option value="test1">test1</Option>
                  <Option value="test2">test2</Option>
                  <Option value="test3">test3</Option>
                </Spin>
              </Select>
            </Form.Item>
          </Col>
          <Col span={4} style={{ textAlign: 'right' }}>
            <Form.Item>
              <Space>
                <Button shape="round" onClick={handleReset}>
                  {formatMessage({ id: 'anki.deck.filter.reset' })}
                </Button>
                <Button type="primary" shape="round" onClick={handleSubmit}>
                  {formatMessage({ id: 'anki.deck.filter.filter' })}
                </Button>
              </Space>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

const AnkiDeck: React.FC<AnkiDeckProps> = props => {
  const { formatMessage } = useIntl();

  const [filterCollapsed, setFilterCollapsed]: [boolean, any] = useState(false);

  const [batchMode, setBatchMode] = useState(false);

  const { dispatch, cards, deck, eof, location, match, fetchingDeck } = props;

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
  };

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

  console.log('location: ', location);
  console.log('match: ', match);

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
    <Spin spinning={fetchingDeck} size="large">
      <div className={styles.wrapper}>
        <MainSearch
          placeholder={formatMessage({ id: 'anki.search.card.placeholder' })}
          onSearch={handleSearch}
          extra={extra}
        />
        <Animate showProp={'visible'} transitionName="collapsed" component="">
          <Filter
            visible={filterCollapsed}
            dispatch={dispatch as Dispatch}
            search={searchRef}
          />
        </Animate>
        <div className={styles.content}>
          <div className={styles.cards}>
            <NewCard />
            {cards.map((card: Card) => (
              <CardThumbnail
                card={card}
                key={card.cardId}
                selectable={batchMode}
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
    fetchingDeck: loading.effects['deck/fetchDeck'],
  }),
)(AnkiDeck);
