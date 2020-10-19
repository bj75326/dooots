import React, { useState } from 'react';
import { Upload, Modal } from 'antd';
import { UploadProps } from 'antd/es/upload';
import { FolderAddOutlined } from '@ant-design/icons';

import styles from './index.less';

interface NewCollectionProps extends UploadProps {
  className?: string;
}

const NewCollection: React.FC<NewCollectionProps> = props => {
  const [newCollVisible, setNewCollVisible]: [boolean, any] = useState(false);

  const handleAddClick = () => {};

  const toggleNewCollModal = () => {
    setNewCollVisible(!newCollVisible);
  };

  return (
    <div className={styles.wrapper}>
      <span className={styles.tab}></span>
      <div
        role="button"
        tabIndex={0}
        onClick={handleAddClick}
        className={styles.add}
      >
        <FolderAddOutlined className={styles.addIcon} />
      </div>
      <Modal
        visible={newCollVisible}
        wrapClassName={styles.modal}
        footer={null}
        closable={false}
        onCancel={toggleNewCollModal}
      ></Modal>
    </div>
  );
};

export default NewCollection;
