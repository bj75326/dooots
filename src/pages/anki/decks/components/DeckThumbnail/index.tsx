import React from 'react';
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

import styles from './index.less';

export interface ToggleStickParams {}

export interface DeckThumbnailProps extends ConnectProps {
  deck: Deck;
  sticking: boolean;
}

const DeckThumbnail: React.FC<DeckThumbnailProps> = props => {
  const { deck, dispatch, sticking } = props;
  const { formatMessage } = useIntl();

  const handleStickClick = () => {
    const stickTimestamp = Date.now();
    if (dispatch) {
      dispatch({
        type: 'decks/stickDeck',
        payload: {
          deckId: deck.deckId,
          stickTimestamp,
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

  const handleDelete = () => {};

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
              {formatMessage({ id: `anki.deck&card.status.${deck.status}` })}
            </div>
            <div
              className={classNames(styles.stick, {
                [styles.stuck]: deck.stick,
              })}
              onClick={handleStickClick}
            >
              {deck.stick ? <PushpinFilled /> : <PushpinOutlined />}
            </div>
          </div>
          <h3 className={styles.deckName}>{deck.deckName}</h3>
          <div className={styles.timestamp}>
            {moment(deck.createTimestamp).format('YYYY-MM-DD hh:mm:ss')}
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
            <div className={styles.delete} onClick={handleDelete}>
              <DeleteOutlined />
            </div>
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
    sticking: loading['effects']['decks/stickDeck'],
  }),
)(DeckThumbnail);
