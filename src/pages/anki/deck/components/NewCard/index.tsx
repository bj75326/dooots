import React, { useState } from 'react';
import { Upload, Modal } from 'antd';
import { UploadProps } from 'antd/es/upload';
import classNames from 'classnames';
import { FileAddOutlined } from '@ant-design/icons';

import styles from './index.less';
import { formatMessage } from 'umi';

interface NewCardProps extends UploadProps {
  className?: string;
}

const NewCard: React.FC<NewCardProps> = props => {
  const [tplListModalVisible, setTplListModalVisible]: [
    boolean,
    any,
  ] = useState(false);

  const handleAddClick = () => {
    setTplListModalVisible(true);
  };

  const toggleTplListModal = () => {
    setTplListModalVisible(
      (tplListModalVisible: boolean) => !tplListModalVisible,
    );
  };

  return (
    <div className={styles.newCard}>
      <div className={styles.wrapper}>
        <div
          role="button"
          tabIndex={0}
          onClick={handleAddClick}
          className={classNames(styles.add, styles.btn)}
        >
          <FileAddOutlined className={styles.addIcon} />
          <span>{formatMessage({ id: 'anki.deck.new' })}</span>
        </div>
        <Modal
          visible={tplListModalVisible}
          wrapClassName={styles.modal}
          footer={null}
          closable={false}
          onCancel={toggleTplListModal}
          width={900}
        ></Modal>
        <div
          role="button"
          tabIndex={0}
          className={classNames(styles.upload, styles.btn)}
        >
          {formatMessage({ id: 'anki.deck.upload' })}
        </div>
      </div>
    </div>
  );
};

export default NewCard;
