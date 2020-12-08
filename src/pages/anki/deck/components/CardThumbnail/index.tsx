import React from 'react';
import { Card } from '../../model';
import { Link } from 'umi';

import styles from './index.less';

export interface CardThumbnailProps {
  card: Card;
}

const CardThumbnail: React.FC<CardThumbnailProps> = props => {
  const { card } = props;

  return <Link className={styles.thumbnail} to={`/`}></Link>;
};

export default CardThumbnail;
