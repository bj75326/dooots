import React, { useEffect, useState } from 'react';
import MainSearch from '../components/MainSearch';
import { useIntl, connect, ConnectProps } from 'umi';
import NewCard from './components/NewCard';
import { Form, Select, Row, Col, Space, Button } from 'antd';
import { FilterOutlined } from '@ant-design/icons';
import Animate from 'rc-animate';
import { StateType, Card } from './model';
import CardThumbnail from './components/CardThumbnail';

import styles from './style.less';
import { getCardStatusColor } from '../utils';

const { Option } = Select;

interface AnkiDeckProps extends ConnectProps {
  deck: StateType['deck'];
  cards: Card[];
  eof: boolean;
}

interface FilterProps {
  visible: boolean;
}

const Filter: React.FC<FilterProps> = props => {
  const form = Form.useForm()[0];
  const { visible } = props;
  const { formatMessage } = useIntl();

  return (
    <div
      className={styles.filter}
      style={{ display: visible ? 'flex' : 'none' }}
    >
      <Form form={form} name="deckFilter" className={styles.form}>
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
              <Select mode="tags"></Select>
            </Form.Item>
          </Col>
          <Col span={4} style={{ textAlign: 'right' }}>
            <Form.Item>
              <Space>
                <Button shape="round">
                  {formatMessage({ id: 'anki.deck.filter.reset' })}
                </Button>
                <Button type="primary" shape="round">
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

  const { dispatch, cards, deck, eof, location, match } = props;

  const handleSearch = (value: string) => {
    console.log(value);
  };

  const toggleFilter = () => {
    setFilterCollapsed((filterCollapsed: boolean) => !filterCollapsed);
  };

  const extra = (
    <Button
      type="primary"
      shape="circle"
      className={styles.searchExtra}
      onClick={toggleFilter}
    >
      <FilterOutlined />
    </Button>
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
    <div className={styles.wrapper}>
      <MainSearch
        placeholder={formatMessage({ id: 'anki.search.card.placeholder' })}
        onSearch={handleSearch}
        extra={extra}
      />
      <Animate showProp={'visible'} transitionName="collapsed" component="">
        <Filter visible={filterCollapsed} />
      </Animate>
      <div className={styles.content}>
        <NewCard />
        {}
      </div>
    </div>
  );
};

export default connect(
  ({
    deck,
    loading,
  }: {
    deck: StateType;
    loading: { [key: string]: boolean };
  }) => ({
    deck: deck.deck,
    cards: deck.cards,
    eof: deck.eof,
  }),
)(AnkiDeck);
