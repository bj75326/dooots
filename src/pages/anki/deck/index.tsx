import React from 'react';
import MainSearch from '../components/MainSearch';
import { useIntl } from 'umi';
import NewCard from './components/NewCard';
import { Form, Select, Row, Col } from 'antd';

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
      <Row>
        <Col span={8}>
          <Form.Item
            name="status"
            label={formatMessage({ id: 'anki.deck.filter.status.label' })}
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
            </Select>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name="rate"
            label={formatMessage({ id: 'anki.deck.filter.rate.label' })}
          >
            <Select>
              <Option value="4">
                {formatMessage({ id: 'anki.deck.filter.rate.underfour' })}
              </Option>
              <Option value="3">
                {formatMessage({ id: 'anki.deck.filter.rate.underthree' })}
              </Option>
              <Option value="2">
                {formatMessage({ id: 'anki.deck.filter.rate.undertwo' })}
              </Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={8}></Col>
        <Col span={8}></Col>
      </Row>
    </Form>
  );

  return (
    <div className={styles.wrapper}>
      <MainSearch
        placeholder={formatMessage({ id: 'anki.search.card.placeholder' })}
        onSearch={handleSearch}
      />
      <div className={styles.content}>
        <div className={styles.filter}>{filterForm}</div>
        <div className={styles.cards}>
          <NewCard />
        </div>
      </div>
    </div>
  );
};

export default AnkiDeck;
