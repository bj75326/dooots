import { GlobalOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import React from 'react';
import { getLocale, setLocale } from 'umi';
import HeaderDropdown from '../HeaderDropdown';
import { MenuInfo } from 'rc-menu/es/interface';
import { languages, Language } from '*/config/settingsConfig';
import classNames from 'classnames';

import styles from './index.less';

interface SelectLangProps {
  className?: string;
}

const SelectLang: React.FC<SelectLangProps> = props => {
  const { className } = props;
  const selectedLang = getLocale();

  const changeLang = ({ key }: MenuInfo): void =>
    setLocale(key as string, false);

  const langMenu = (
    <Menu
      className={styles.menu}
      selectedKeys={[selectedLang]}
      onClick={changeLang}
    >
      {languages.map((language: Language) => (
        <Menu.Item key={language.value}>{language.name}</Menu.Item>
      ))}
    </Menu>
  );

  return (
    <HeaderDropdown overlay={langMenu} placement="bottomRight">
      <span className={classNames(className, styles.dropdown)}>
        <GlobalOutlined title="语言" />
      </span>
    </HeaderDropdown>
  );
};

export default SelectLang;
