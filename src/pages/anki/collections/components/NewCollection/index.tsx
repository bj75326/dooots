import React, { useState } from 'react';
import { Upload, Modal } from 'antd';
import { UploadProps } from 'antd/es/upload';
import { PlusOutlined } from '@ant-design/icons';
import { useIntl } from 'umi';

import styles from './index.less';

interface NewCollectionProps extends UploadProps {
  className?: string;
}

const NewCollection: React.FC<NewCollectionProps> = props => {
  const [newCollVisible, setNewCollVisible]: [boolean, any] = useState(false);

  const { formatMessage } = useIntl();

  const handleAddClick = () => {};

  const toggleNewCollModal = () => {
    setNewCollVisible(!newCollVisible);
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
        fill-opacity="0"
        stroke-dasharray="8,4"
        stroke-opacity="0.503962862"
      >
        <use
          id="Rectangle"
          stroke="#979797"
          mask="url(#mask-2)"
          stroke-width="8"
          fill="#D8D8D8"
          xlinkHref="#path-1"
        ></use>
      </g>
    </svg>
  );

  return (
    <div className={styles.wrapper}>
      {background}
      <div
        role="button"
        tabIndex={0}
        onClick={handleAddClick}
        className={styles.add}
      >
        <PlusOutlined className={styles.addIcon} />
        <span>{formatMessage({ id: 'anki.collections.new' })}</span>
      </div>
      <Modal
        visible={newCollVisible}
        wrapClassName={styles.modal}
        footer={null}
        closable={false}
        onCancel={toggleNewCollModal}
      ></Modal>
      <div
        role="button"
        tabIndex={0}
        //onClick={}
        className={styles.upload}
      >
        {formatMessage({ id: 'anki.collections.upload' })}
      </div>
    </div>
  );
};

export default NewCollection;
