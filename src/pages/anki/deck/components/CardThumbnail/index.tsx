import React, { useCallback } from 'react';
import { Card } from '../../model';
import { Link, connect, ConnectProps, useIntl } from 'umi';
import { getCardStatusColor } from '../../../utils';
import classNames from 'classnames';
import {
  PushpinOutlined,
  PushpinFilled,
  LineChartOutlined,
  DownloadOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import moment from 'moment';
import { Modal } from 'antd';

import styles from './index.less';

export interface CardThumbnailProps {
  card: Card;
  selectable: boolean;
  onSelect?: any;
  selected?: {
    deckId: string;
    cardId: string;
  }[];
}

const CardThumbnail: React.FC<CardThumbnailProps> = props => {
  const { card, selectable, onSelect, selected } = props;
  const { formatMessage } = useIntl();

  const handleStickClick = useCallback(() => {}, []);

  const handleSelectClick = useCallback(() => {
    onSelect({});
  }, []);

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
            onClick={handleStickClick}
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
          <div className={classNames(styles.scoreChart, styles.actionBtn)}>
            <LineChartOutlined />
          </div>
          <Modal></Modal>
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
      <div className={styles.selectable} onClick={handleSelectClick}>
        {content}
        <div className={styles.checkbox}></div>
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
