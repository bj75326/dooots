import React from 'react';
import { Input } from 'antd';
import { SearchProps } from 'antd/es/input/Search';

import styles from './index.less';

interface MainSearchProps extends SearchProps {}

const MainSearchProps: React.FC<MainSearchProps> = props => (
  <div className={styles.wrapper}>
    <Input.Search className={styles.search} enterButton {...props} />
  </div>
);

export default MainSearchProps;
