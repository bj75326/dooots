import React from 'react';
import { Input } from 'antd';
import { SearchProps } from 'antd/es/input/Search';
import classNames from 'classnames';

import styles from './index.less';

interface MainSearchProps extends SearchProps {
  extra?: React.ReactNode;
  className?: string;
}

const MainSearchProps: React.FC<MainSearchProps> = props => {
  const { extra, className, ...otherProps } = props;

  return (
    <div
      className={classNames(
        styles.wrapper,
        { [styles.hasExtra]: props.extra },
        className,
      )}
    >
      <Input.Search className={styles.search} enterButton {...otherProps} />
      {props.extra ? props.extra : null}
    </div>
  );
};

export default MainSearchProps;
