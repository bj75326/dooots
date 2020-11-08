import React from 'react';
import { Axis, Chart } from 'bizcharts';

import styles from './index.less';

export interface TimePoint {
  elapsedTimeSinceLearing: number;
  retention: number;
}

export interface EbbinghausProps {
  title?: React.ReactNode;
  data: TimePoint[];
}

const Ebbinghaus: React.FC<EbbinghausProps> = props => {
  const { title, data } = props;

  return (
    <div className={styles.chart} style={{}}>
      <div>
        {title && <div>{title}</div>}
        <Chart
          padding={[10, 20, 50, 40]}
          autoFit
          height={300}
          data={data}
        ></Chart>
      </div>
    </div>
  );
};

export default Ebbinghaus;
