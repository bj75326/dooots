import React from 'react';
import { Deck } from '../../model';
import { Link } from 'umi';
import { PushpinOutlined, PushpinFilled } from '@ant-design/icons';
import classNames from 'classnames';
import moment from 'moment';

import styles from './index.less';

export interface DeckThumbnailProps {
  deck: Deck;
}

const DeckThumbnail: React.FC<DeckThumbnailProps> = props => {
  const { deck } = props;

  const handleStickClick = () => {};

  return (
    <Link className={styles.thumbnail} to={`/anki/${deck.deckId}`}>
      <div className={styles.card}></div>
      <div className={styles.wrapper}>
        <div className={styles.body}>
          <div className={styles.top}>
            <div className={styles.status}>{deck.status}</div>
            <div
              className={classNames(styles.stick, {
                [styles.stuck]: deck.stick,
              })}
              onClick={handleStickClick}
            >
              {deck.stick ? <PushpinFilled /> : <PushpinOutlined />}
            </div>
          </div>
          <div className={styles.deckName}>{deck.deckName}</div>
          <div className={styles.timestamp}>
            {moment(deck.createTimestamp).format('YYYY-MM-DD hh:mm:ss')}
          </div>
          <div className={styles.description}>{deck.description}</div>
        </div>
        <div className={styles.actions}></div>
      </div>
    </Link>
  );
};

export default DeckThumbnail;
