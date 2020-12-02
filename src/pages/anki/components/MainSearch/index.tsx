import React from 'react';
import { Input } from 'antd';
import { SearchProps } from 'antd/es/input/Search';
import classNames from 'classnames';

import styles from './index.less';

interface MainSearchProps extends SearchProps {
  extra?: React.ReactNode;
  style?: object;
}

const MainSearchProps: React.FC<MainSearchProps> = props => {
  const { extra, style, ...otherProps } = props;

  return (
    <div
      className={classNames(styles.wrapper, { [styles.hasExtra]: props.extra })}
      style={style}
    >
      <Input.Search className={styles.search} enterButton {...otherProps} />
      {props.extra ? props.extra : null}
    </div>
  );
};

export default MainSearchProps;
