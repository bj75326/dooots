import React from 'react';
import { Deck } from '../../model';
import { Link } from 'umi';
import { PushpinOutlined } from '@ant-design/icons';

import styles from './index.less';

export interface DeckThumbnailProps {
  deck: Deck;
}

const DeckThumbnail: React.FC<DeckThumbnailProps> = props => {
  const { deck } = props;
  return (
    <Link className={styles.thumbnail} to={`/anki/${deck.deckId}`}>
      <div className={styles.card}></div>
      <div className={styles.wrapper}></div>
    </Link>
  );
};

export default DeckThumbnail;
