import React from 'react';
import { Axis, Chart, LineAdvance, Tooltip, Annotation } from 'bizcharts';

import styles from './index.less';

export interface TimePoint {
  elapsedTimeSinceLearing: number;
  retention: number;
}

export interface EbbinghausProps {
  title?: React.ReactNode;
  data?: TimePoint[];
}

const defaultData = [
  {
    elapsedTimeSinceLearing: 0,
    retention: 100,
  },
  {
    elapsedTimeSinceLearing: 0.014,
    retention: 58,
  },
  {
    elapsedTimeSinceLearing: 0.042,
    retention: 44,
  },
  {
    elapsedTimeSinceLearing: 0.375,
    retention: 36,
  },
  {
    elapsedTimeSinceLearing: 1,
    retention: 33.7,
  },
  {
    elapsedTimeSinceLearing: 2,
    retention: 27.8,
  },
  {
    elapsedTimeSinceLearing: 6,
    retention: 25.4,
  },
  {
    elapsedTimeSinceLearing: 31,
    retention: 21.1,
  },
];

const scale = {
  elapsedTimeSinceLearing: {
    alias: 'Elapsed Time Since Learing',
    type: 'pow',
    ticks: ['', '', '', '', 1, 2, 6, 31],
    min: -0.2,
    max: 33,
  },
  retention: {
    alias: 'Retention %',
    type: 'linear',
    min: 0,
    max: 100,
    tickCount: 10,
  },
};

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
          data={defaultData}
          scale={scale}
        >
          <Axis name="elapsedTimeSinceLearing" title />
          <Axis name="retention" title />
          <Tooltip />
          <LineAdvance
            shape="smooth"
            point
            position="elapsedTimeSinceLearing*retention"
          />
        </Chart>
      </div>
    </div>
  );
};

export default Ebbinghaus;
