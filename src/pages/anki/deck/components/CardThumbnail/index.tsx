import React from 'react';
import { Card } from '../../model';
import { Link, connect, ConnectProps } from 'umi';

import styles from './index.less';

export interface CardThumbnailProps {
  card: Card;
}

const CardThumbnail: React.FC<CardThumbnailProps> = props => {
  const { card } = props;

  return (
    <Link className={styles.thumbnail} to={`/${card.deckId}/${card.cardId}`}>
      <div className={styles.wrapper}>
        <div className={styles.body}>
          <div className={styles.top}></div>
        </div>
        <div className={styles.actions}></div>
      </div>
    </Link>
  );
};

export default CardThumbnail;
