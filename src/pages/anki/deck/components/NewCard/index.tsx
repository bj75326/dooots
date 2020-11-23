import React from 'react';
import { Upload } from 'antd';
import { UploadProps } from 'antd/es/upload';

import styles from './index.less';

interface NewCardProps extends UploadProps {
  className?: string;
}

const NewCard: React.FC<NewCardProps> = props => {
  return (
    <div className={styles.newCard}>
      <div></div>
    </div>
  );
};

export default NewCard;
