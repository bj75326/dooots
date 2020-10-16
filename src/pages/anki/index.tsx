import React, { Component } from 'react';
import { Input, Tooltip } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { NavLink, useIntl } from 'umi';
import {
  HomeOutlined,
  UserOutlined,
  HighlightOutlined,
} from '@ant-design/icons';

import styles from './style.less';

interface AnkiLayoutProps {
  match: {
    url: string;
    path: string;
  };
  location: {
    pathname: string;
  };
}

interface AnkiMenuProps {}

const AnkiMenu: React.FC<AnkiMenuProps> = () => {
  const { formatMessage } = useIntl();

  return (
    <ul className={styles.ankiMenu}>
      <Tooltip
        placement="right"
        title={formatMessage({ id: 'anki.menu.home' })}
      >
        <li>
          <NavLink to="/anki/collections" activeClassName={styles.selected}>
            <HighlightOutlined className={styles.ankiMenuIcon} />
          </NavLink>
        </li>
      </Tooltip>
      <Tooltip
        placement="right"
        title={formatMessage({ id: 'anki.menu.person' })}
      >
        <li>
          <NavLink to="/anki/person" activeClassName={styles.selected}>
            <UserOutlined className={styles.ankiMenuIcon} />
          </NavLink>
        </li>
      </Tooltip>
    </ul>
  );
};

const AnkiLayout: React.FC<AnkiLayoutProps> = props => {
  const { formatMessage } = useIntl();

  const handleFormSubmit = (value: string) => {
    // eslint-disable-next-line no-console
    console.log(value);
  };

  const mainSearch = (
    <div className={styles.searchWrapper}>
      <Input.Search
        placeholder={formatMessage({ id: 'anki.search.placeholder' })}
        onSearch={handleFormSubmit}
        className={styles.search}
      />
    </div>
  );

  const { children } = props;

  return (
    <div className={styles.wrapper}>
      <AnkiMenu />
      <PageHeaderWrapper className={styles.content} content={mainSearch}>
        {children}
      </PageHeaderWrapper>
    </div>
  );
};

export default AnkiLayout;
