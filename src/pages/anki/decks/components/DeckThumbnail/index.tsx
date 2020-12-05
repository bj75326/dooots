import React, { useState } from 'react';
import { Deck } from '../../model';
import { Link, useIntl, connect, ConnectProps } from 'umi';
import {
  PushpinOutlined,
  PushpinFilled,
  DeleteOutlined,
} from '@ant-design/icons';
import classNames from 'classnames';
import moment from 'moment';
import { getDeckStatusColor } from '../../../utils';
import { Modal, Button } from 'antd';

import styles from './index.less';

export interface ToggleStickParams {
  deckId: Deck['deckId'];
  stick: Deck['stick'];
  stickTimestamp: Deck['stickTimestamp'];
}

export interface RemoveDeckParams {
  deckId: Deck['deckId'];
}

export interface DeckThumbnailProps extends Partial<ConnectProps> {
  deck: Deck;
  sticking: boolean;
}

const DeckThumbnail: React.FC<DeckThumbnailProps> = props => {
  const { deck, dispatch, sticking } = props;
  const { formatMessage } = useIntl();

  const [dltModalVisible, setDltModalVisible]: [boolean, any] = useState(false);

  const handleStickClick = (e: React.MouseEvent) => {
    //e.stopPropagation();
    e.preventDefault();
    const stickTimestamp = Date.now();
    if (dispatch) {
      dispatch({
        type: 'decks/stickOrUnstickDeck',
        payload: {
          deckId: deck.deckId,
          stick: !deck.stick,
          stickTimestamp,

          formatMessage,
        },
      });
    }
  };

  const getStatusBg = (deck: Deck) => {
    const { status, numberOfOverdue } = deck;
    if (status === 'overdue') {
      //todo 按照overdue的数目显示颜色变化
    }
    return getDeckStatusColor(status);
  };

  const handleDltBtnClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setDltModalVisible((dltModalVisible: boolean) => !dltModalVisible);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    if (dispatch) {
      dispatch({
        type: 'decks/deleteDeck',
        payload: {
          deckId: deck.deckId,
          formatMessage,
        },
      });
    }
    setDltModalVisible(false);
  };

  const footerElement = (
    <div>
      <Button shape="round" onClick={handleDltBtnClick}>
        {formatMessage({ id: 'app.common.cancel' })}
      </Button>
      <Button shape="round" type="primary" onClick={handleDelete}>
        {formatMessage({ id: 'app.common.confirm' })}
      </Button>
    </div>
  );

  return (
    <Link className={styles.thumbnail} to={`/anki/${deck.deckId}`}>
      <div className={styles.card}></div>
      <div className={styles.wrapper}>
        <div className={styles.body}>
          <div className={styles.top}>
            <div
              className={styles.status}
              style={{ background: getStatusBg(deck) }}
            >
              {deck.status &&
                formatMessage({ id: `anki.deck&card.status.${deck.status}` })}
            </div>
            <div
              className={classNames(styles.stick, {
                [styles.stuck]: deck.stick,
              })}
              role="button"
              onClick={handleStickClick}
              // onMouseUp={handleStickMouseUp}
              // onMouseDown={ handleStickMouseDown}
            >
              {deck.stick ? <PushpinFilled /> : <PushpinOutlined />}
            </div>
          </div>
          <h3 className={styles.deckName}>{deck.deckName}</h3>
          <div className={styles.timestamp}>
            {deck.createTimestamp &&
              moment(deck.createTimestamp).format('YYYY-MM-DD hh:mm:ss')}
          </div>
          <p className={styles.description} title={deck.description}>
            {deck.description}
          </p>
        </div>
        <div className={styles.actions}>
          <div className={styles.number}>
            <span style={{ color: getDeckStatusColor('today') }}>
              {deck.numberOfToday}
            </span>
            /
            <span style={{ color: getDeckStatusColor('overdue') }}>
              {deck.numberOfOverdue}
            </span>
            /<span>{deck.numberOfCards}</span>
          </div>
          <div className={styles.btns}>
            <div className={styles.delete} onClick={handleDltBtnClick}>
              <DeleteOutlined />
            </div>
            <Modal
              visible={dltModalVisible}
              width={280}
              closable={false}
              title={formatMessage({ id: 'anki.decks.delete.modal.title' })}
              onCancel={handleDltBtnClick}
              footer={footerElement}
            >
              <div className={styles.deleteContent}>
                {formatMessage({ id: 'anki.decks.delete.modal.content' })}
              </div>
            </Modal>
          </div>
        </div>
      </div>
    </Link>
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
    sticking: loading['effects']['decks/stickOrUnstickDeck'],
  }),
)(DeckThumbnail);
