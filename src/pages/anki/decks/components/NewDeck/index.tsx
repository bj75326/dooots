import React, { useState } from 'react';
import { Upload, Modal, Form, Input } from 'antd';
import { UploadProps } from 'antd/es/upload';
import { PlusOutlined } from '@ant-design/icons';
import { useIntl } from 'umi';
import { SettingModelState, getColor } from '@/models/settings';
import classNames from 'classnames';

import styles from './index.less';

const FormItem = Form.Item;

interface NewDeckProps extends UploadProps {
  className?: string;
  primaryColor: SettingModelState['primaryColor'];
}

const NewDeck: React.FC<NewDeckProps> = props => {
  const [newDeckVisible, setNewDeckVisible]: [boolean, any] = useState(false);

  const { formatMessage } = useIntl();

  const handleAddClick = () => {
    setNewDeckVisible(true);
  };

  const toggleNewDeckModal = () => {
    setNewDeckVisible(!newDeckVisible);
  };

  const addModalContent = (
    <div className={styles.content}>
      <h2 className={styles.title}>
        {formatMessage({ id: 'anki.decks.new.title' })}
      </h2>
      <div className={styles.scroll}>
        <Form form={Form.useForm()[0]} name="newDeck" layout="vertical">
          <FormItem
            name="deckName"
            label={formatMessage({ id: 'anki.decks.new.deckName' })}
          >
            <Input />
          </FormItem>
        </Form>
      </div>
    </div>
  );

  return (
    <div className={styles.decks}>
      <div className={styles.card}></div>
      <div className={styles.wrapper}>
        <div
          role="button"
          tabIndex={0}
          onClick={handleAddClick}
          className={classNames(styles.add, styles.btn)}
        >
          <PlusOutlined className={styles.addIcon} />
          <span>{formatMessage({ id: 'anki.decks.new' })}</span>
        </div>
        <Modal
          visible={newDeckVisible}
          wrapClassName={styles.modal}
          footer={null}
          closable={false}
          onCancel={toggleNewDeckModal}
        >
          {addModalContent}
        </Modal>
        <div
          role="button"
          tabIndex={0}
          className={classNames(styles.upload, styles.btn)}
        >
          {formatMessage({ id: 'anki.decks.upload' })}
        </div>
      </div>
    </div>
  );
};

export default NewDeck;
