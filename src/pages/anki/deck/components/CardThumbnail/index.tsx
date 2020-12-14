import React, { useCallback, useState, useMemo } from 'react';
import { Card } from '../../model';
import { Button } from 'antd';
import { Link, connect, ConnectProps, useIntl } from 'umi';
import { getCardStatusColor } from '../../../utils';
import classNames from 'classnames';
import RatingRecords from '@/pages/anki/components/Charts/RatingRecords';
import {
  PushpinOutlined,
  PushpinFilled,
  LineChartOutlined,
  DownloadOutlined,
  DeleteOutlined,
  CheckOutlined,
} from '@ant-design/icons';
import moment from 'moment';
import { Modal } from 'antd';

import styles from './index.less';

export interface CardThumbnailProps {
  card: Card;
  selectable: boolean;
  onSelect?: any;
  selected?: boolean;
}

const noop = () => {};

const CardThumbnail: React.FC<CardThumbnailProps> = props => {
  const { card, selectable, onSelect, selected } = props;
  const { formatMessage } = useIntl();

  const [chartModalVisible, setChartModalVisible]: [boolean, any] = useState(
    false,
  );

  const rates = useMemo(() => card.rates, [card]);

  const handleStickClick = useCallback(() => {}, []);

  const handleSelectClick = useCallback(() => {
    onSelect({
      deckId: card.deckId,
      cardId: card.cardId,
    });
  }, [onSelect, card]);

  const handleChartBtnClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      setChartModalVisible((chartModalVisible: boolean) => !chartModalVisible);
    },
    [setChartModalVisible],
  );

  const footerElement = useMemo(
    () => (
      <div>
        <Button shape="round" type="primary" onClick={handleChartBtnClick}>
          {formatMessage({ id: 'app.common.confirm' })}
        </Button>
      </div>
    ),
    [handleChartBtnClick],
  );

  const content = (
    <div className={styles.wrapper}>
      <div className={styles.body}>
        <div className={styles.top}>
          <div
            className={styles.status}
            style={{ background: getCardStatusColor(card.status) }}
          >
            {card.status &&
              formatMessage({ id: `anki.deck&card.status.${card.status}` })}
          </div>
          <div
            className={classNames(styles.stick, {
              [styles.stuck]: card.stick,
            })}
            role="button"
            onClick={selectable ? noop : handleStickClick}
          >
            {card.stick ? <PushpinFilled /> : <PushpinOutlined />}
          </div>
        </div>
        <h3 className={styles.cardName}>{card.cardName}</h3>
        <div className={styles.timestamp}>
          {card.updateTimestamp &&
            moment(card.updateTimestamp).format('YYYY-MM-DD hh:mm:ss')}
        </div>
      </div>
      <div className={styles.actions}>
        <div className={styles.normalBtns}>
          <div
            className={classNames(styles.rateChart, styles.actionBtn)}
            role="button"
            onClick={selectable ? noop : handleChartBtnClick}
          >
            <LineChartOutlined />
          </div>
          <Modal
            visible={chartModalVisible}
            width={520}
            closable={false}
            title={formatMessage({ id: 'anki.deck.chart.modal.title' })}
            onCancel={handleChartBtnClick}
            footer={footerElement}
          >
            <RatingRecords data={rates} />
          </Modal>
        </div>
        <div className={styles.hoverBtns}>
          <div className={classNames(styles.delete, styles.actionBtn)}>
            <DeleteOutlined />
          </div>
          <Modal></Modal>
          <div className={classNames(styles.download, styles.actionBtn)}>
            <DownloadOutlined />
          </div>
        </div>
      </div>
    </div>
  );

  if (selectable) {
    return (
      <div
        className={classNames(styles.selectable, {
          [styles.selected]: selected,
        })}
        onClick={handleSelectClick}
      >
        {content}
        {selected && (
          <div className={styles.checkout}>
            <CheckOutlined />
          </div>
        )}
      </div>
    );
  }

  return (
    <Link className={styles.thumbnail} to={`/${card.deckId}/${card.cardId}`}>
      {content}
    </Link>
  );
};

export default CardThumbnail;
