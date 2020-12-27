import React, { memo, useMemo, useCallback } from 'react';
import { Form, Button, Select, Spin, Row, Col, Space } from 'antd';
import { useIntl, connect, ConnectProps } from 'umi';
import { StateType } from '../../model';

import styles from './index.less';

const Option = Select.Option;

interface FilterProps extends Partial<ConnectProps> {
  visible: boolean;
  search: { current: string };
  tags: string[];
  loadingTags: boolean;
  deckId?: string;
}

const Filter: React.FC<FilterProps> = props => {
  const form = Form.useForm()[0];
  const { visible, dispatch, search, tags, loadingTags, deckId } = props;
  const { formatMessage } = useIntl();

  console.log('search in filter: ', search);

  const filterCards = useCallback(() => {
    console.log('开始了哦');
    console.log('search.current ', search.current);
    console.log('status ', form.getFieldValue('status'));
    console.log('rate ', form.getFieldValue('rate'));
    console.log('tags ', form.getFieldValue('tags'));
    if (dispatch) {
      dispatch({
        type: 'deck/fetchCards',
        payload: {
          search: search.current,
          status: form.getFieldValue('status'),
          rate: form.getFieldValue('rate'),
          tags: form.getFieldValue('tags'),
        },
      });
    }
  }, [dispatch, form, search]);

  const handleReset = useCallback(() => {
    form.resetFields();
    search.current = '';
    filterCards();
  }, [form, filterCards, search]);

  const handleSubmit = useCallback(() => {
    filterCards();
  }, [filterCards]);

  const notFoundContent = useMemo(() => <Spin className={styles.noTags} />, []);

  const handleLoadTags = useCallback(() => {
    if (dispatch) {
      dispatch({
        type: 'deck/fetchTags',
        payload: {
          deckId,
        },
      });
    }
  }, []);

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
              <Select
                mode="tags"
                notFoundContent={notFoundContent}
                onDropdownVisibleChange={handleLoadTags}
                dropdownClassName="dooots-tags-select-dropdown"
              >
                {loadingTags
                  ? null
                  : tags.map((tag: string, key) => (
                      <Option
                        value={tag}
                        key={`${tag}_${key}`}
                        className="dooots-tags-option"
                      >
                        {tag}
                      </Option>
                    ))}
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

export default connect(
  ({
    deck,
    loading,
  }: {
    deck: StateType;
    loading: {
      effects: {
        [key: string]: boolean;
      };
    };
  }) => ({
    tags: deck.tags,
    deckId: deck.deck ? deck.deck.deckId : undefined,
    loadingTags: loading.effects['deck/fetchTags'],
  }),
)(Filter);
