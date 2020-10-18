import React, { useState } from 'react';
import { Upload, Modal } from 'antd';
import { UploadProps } from 'antd/es/upload';
import { FileAddOutlined } from '@ant-design/icons';

import styles from './index.less';

interface NewCollectionProps extends UploadProps {}

const NewCollection: React.FC<NewCollectionProps> = () => {
  const [newCollVisible, setNewCollVisible]: [boolean, any] = useState(false);

  const handleAddClick = () => {};

  return (
    <div className={styles.wrapper}>
      <div
        role="button"
        tabIndex={0}
        onClick={handleAddClick}
        className={styles.add}
      >
        <FileAddOutlined className={styles.addIcon} />
      </div>
      <Modal visible={newCollVisible} wrapClassName={styles.modal}></Modal>
    </div>
  );
};
