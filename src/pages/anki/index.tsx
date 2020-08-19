import React, { Component } from 'react';
import { Input, Tooltip } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { NavLink } from 'umi';
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

interface AnkiMenuProps {
  location: {
    pathname: string;
  };
}

const AnkiMenu: React.FC<AnkiMenuProps> = () => {
  return (
    <ul className={styles.ankiMenu}>
      <Tooltip placement="right" title="开始记录">
        <li>
          <NavLink to="/anki/collections" activeClassName={styles.selected}>
            Test
          </NavLink>
        </li>
      </Tooltip>
      <Tooltip placement="right" title="个人中心">
        <li>
          <NavLink to="/anki/person" activeClassName={styles.selected}>
            Test
          </NavLink>
        </li>
      </Tooltip>
    </ul>
  );
};

class AnkiLayout extends Component<AnkiLayoutProps> {
  handleFormSubmit = (value: string) => {
    // eslint-disable-next-line no-console
    console.log(value);
  };

  render() {
    const mainSearch = (
      <div style={{ textAlign: 'center' }}>
        <Input.Search
          placeholder="请输入"
          enterButton=""
          size="large"
          onSearch={this.handleFormSubmit}
          style={{}}
        />
      </div>
    );

    const { children } = this.props;

    return (
      <div className={styles.wrapper}>
        <AnkiMenu location={this.props.location} />
        <PageHeaderWrapper content={mainSearch}>{children}</PageHeaderWrapper>
      </div>
    );
  }
}

export default AnkiLayout;
