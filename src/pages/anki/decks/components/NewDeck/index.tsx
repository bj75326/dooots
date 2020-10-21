import React, { useState } from 'react';
import { Upload, Modal, Form } from 'antd';
import { UploadProps } from 'antd/es/upload';
import { PlusOutlined } from '@ant-design/icons';
import { useIntl } from 'umi';
import { SettingModelState, getColor } from '@/models/settings';
import classNames from 'classnames';

import styles from './index.less';

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

  const background = (
    <svg
      width="188px"
      height="210px"
      viewBox="0 0 188 210"
      className={styles.bg}
    >
      <defs>
        <path
          d="M10,0 L80,0 L110,30 L178,30 C183.522847,30 188,34.4771525 188,40 L188,200 C188,205.522847 183.522847,210 178,210 L10,210 C4.4771525,210 6.76353751e-16,205.522847 0,200 L0,10 C-6.76353751e-16,4.4771525 4.4771525,1.01453063e-15 10,0 Z"
          id="path-1"
        ></path>
        <mask
          id="mask-2"
          maskContentUnits="userSpaceOnUse"
          maskUnits="objectBoundingBox"
          x="0"
          y="0"
          width="188"
          height="210"
          fill="white"
        >
          <use xlinkHref="#path-1"></use>
        </mask>
      </defs>
      <g
        id="Page-1"
        stroke="none"
        stroke-width="1"
        fill="none"
        fill-rule="evenodd"
      >
        <use
          id="Rectangle"
          stroke-opacity="0.3"
          stroke={getColor(props.primaryColor)}
          mask="url(#mask-2)"
          stroke-width="8"
          fill-opacity="0"
          fill="#D8D8D8"
          stroke-dasharray="8,4"
          xlinkHref="#path-1"
        ></use>
        <path
          d="M8,166 L188,166"
          id="Line"
          stroke-opacity="0.3"
          stroke={getColor(props.primaryColor)}
          stroke-width="4"
          stroke-linecap="square"
          stroke-dasharray="4,8"
        ></path>
      </g>
    </svg>
  );

  const addModalContent = (
    <div className={styles.content}>
      <h2 className={styles.title}>
        {formatMessage({ id: 'anki.decks.new.title' })}
      </h2>
      <div className={styles.scroll}>
        <div></div>
      </div>
    </div>
  );

  return (
    <div className={styles.wrapper}>
      {background}
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
        //onClick={}
        className={classNames(styles.upload, styles.btn)}
      >
        {formatMessage({ id: 'anki.decks.upload' })}
      </div>
    </div>
  );
};

export default NewDeck;
