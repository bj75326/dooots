import React, { useState } from 'react';
import { Upload, Modal, Form, Input, Tag } from 'antd';
import { UploadProps } from 'antd/es/upload';
import { PlusOutlined } from '@ant-design/icons';
import { useIntl } from 'umi';
import { SettingModelState } from '@/models/settings';
import classNames from 'classnames';
import EditableTagGroup from '../../../components/EditableTagGroup';

import styles from './index.less';

const FormItem = Form.Item;
const { TextArea } = Input;

interface NewDeckProps extends UploadProps {
  className?: string;
}

const NewDeck: React.FC<NewDeckProps> = props => {
  const [newDeckVisible, setNewDeckVisible]: [boolean, any] = useState(false);

  const [tags, setTags]: [string[], any] = useState([]);

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
        <div className={styles.body}>
          <Form
            form={Form.useForm()[0]}
            name="newDeck"
            layout="vertical"
            className={styles.form}
          >
            <FormItem
              name="deckName"
              label={formatMessage({ id: 'anki.decks.new.deckName' })}
            >
              <Input />
            </FormItem>
            <FormItem
              name="description"
              label={formatMessage({ id: 'anki.decks.new.description' })}
            >
              <TextArea />
            </FormItem>
            <FormItem
              name="tags"
              label={formatMessage({ id: 'anki.decks.new.tags' })}
            >
              <EditableTagGroup tags={tags} onTagChange={setTags} />
            </FormItem>
          </Form>
        </div>
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
          width={1000}
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
