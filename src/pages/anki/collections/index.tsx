import React from 'react';
import MainSearch from '../components/MainSearch';
import { useIntl, connect, ConnectProps } from 'umi';
import NewCollection from './components/NewCollection';
import { ConnectState } from '@/models/connect';

import styles from './style.less';
import { PropertySafetyFilled } from '@ant-design/icons';

interface AnkiCollectionsProps extends ConnectProps {
  primaryColor: ConnectState['settings']['primaryColor'];
}

const AnkiCollections: React.FC<AnkiCollectionsProps> = props => {
  const { formatMessage } = useIntl();

  const handleSearch = (value: string) => {
    console.log(value);
  };

  return (
    <div className={styles.wrapper}>
      <MainSearch
        placeholder={formatMessage({
          id: 'anki.search.collection.placeholder',
        })}
        onSearch={handleSearch}
      />
      <div className={styles.content}>
        <NewCollection
          className={styles.folder}
          primaryColor={props.primaryColor}
        />
      </div>
    </div>
  );
};

export default connect(({ settings }: ConnectState) => ({
  primaryColor: settings.primaryColor,
}))(AnkiCollections);
