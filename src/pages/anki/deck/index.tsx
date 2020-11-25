import React from 'react';
import MainSearch from '../components/MainSearch';
import { useIntl } from 'umi';
import NewCard from './components/NewCard';
import { Form, Select, Row, Col, Space, Button } from 'antd';
import { FilterOutlined } from '@ant-design/icons';

import styles from './style.less';

const { Option } = Select;

interface AnkiDeckProps {}

const AnkiDeck: React.FC<AnkiDeckProps> = props => {
  const { formatMessage } = useIntl();

  const handleSearch = (value: string) => {
    console.log(value);
  };

  const form = Form.useForm()[0];

  const filterForm = (
    <Form form={form} name="deckFilter" className={styles.form}>
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item
            name="status"
            label={formatMessage({ id: 'anki.deck.filter.status.label' })}
            labelCol={{ flex: '0 0 120px' }}
          >
            <Select>
              <Option value="all">
                {formatMessage({ id: 'anki.deck.filter.status.all' })}
              </Option>
              <Option value="wip">
                {formatMessage({ id: 'anki.deck.filter.status.wip' })}
              </Option>
              <Option value="overdue">
                {formatMessage({ id: 'anki.deck.filter.status.overdue' })}
              </Option>
              <Option value="done">
                {formatMessage({ id: 'anki.deck.filter.status.done' })}
              </Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name="rate"
            label={formatMessage({ id: 'anki.deck.filter.rate.label' })}
            labelCol={{ flex: '0 0 120px' }}
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
        <Col span={8} hidden>
          <Form.Item
            name="tags"
            label={formatMessage({ id: 'anki.deck.filter.tags' })}
            labelCol={{ flex: '0 0 120px' }}
          ></Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item>
            <Space>
              <Button>{formatMessage({ id: 'anki.deck.filter.reset' })}</Button>
              <Button>
                {formatMessage({ id: 'anki.deck.filter.filter' })}
              </Button>
            </Space>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );

  const extra = (
    <Button type="primary" shape="circle" className={styles.searchExtra}>
      <FilterOutlined />
    </Button>
  );

  return (
    <div className={styles.wrapper}>
      <MainSearch
        placeholder={formatMessage({ id: 'anki.search.card.placeholder' })}
        onSearch={handleSearch}
        extra={extra}
        className={styles.search}
      />
      <div className={styles.filter}>{filterForm}</div>
      <div className={styles.content}>
        <NewCard />
      </div>
    </div>
  );
};

export default AnkiDeck;
