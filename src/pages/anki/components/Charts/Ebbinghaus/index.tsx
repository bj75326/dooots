import React from 'react';
import {
  Axis,
  Chart,
  LineAdvance,
  Tooltip,
  Annotation,
  Line,
  Geom,
  Point,
} from 'bizcharts';

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
    type: 'non-intervention',
  },
  {
    elapsedTimeSinceLearing: 0.014,
    retention: 58,
    type: 'non-intervention',
  },
  {
    elapsedTimeSinceLearing: 0.042,
    retention: 44,
    type: 'non-intervention',
  },
  {
    elapsedTimeSinceLearing: 0.375,
    retention: 36,
    type: 'non-intervention',
  },
  {
    elapsedTimeSinceLearing: 1,
    retention: 33.7,
    type: 'non-intervention',
  },
  {
    elapsedTimeSinceLearing: 2,
    retention: 27.8,
    type: 'non-intervention',
  },
  {
    elapsedTimeSinceLearing: 6,
    retention: 25.4,
    type: 'non-intervention',
  },
  {
    elapsedTimeSinceLearing: 31,
    retention: 21.1,
    type: 'non-intervention',
  },
  //test
  {
    elapsedTimeSinceLearing: 1,
    retention: 100,
    type: 'repeated-review',
  },

  {
    elapsedTimeSinceLearing: 1.5,
    retention: 70,
    type: 'repeated-review',
  },

  {
    elapsedTimeSinceLearing: 2,
    retention: 100,
    type: 'repeated-review',
  },
  {
    elapsedTimeSinceLearing: 4,
    retention: 70,
    type: 'repeated-review',
  },

  {
    elapsedTimeSinceLearing: 6,
    retention: 100,
    type: 'repeated-review',
  },

  {
    elapsedTimeSinceLearing: 18,
    retention: 70,
    type: 'repeated-review',
  },
  {
    elapsedTimeSinceLearing: 31,
    retention: 100,
    type: 'repeated-review',
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
          <Axis
            name="elapsedTimeSinceLearing"
            title
            grid={{
              line: {
                type: 'line',
                style: {
                  stroke: '#d9d9d9',
                  lineDash: [4, 4],
                },
              },
            }}
            tickLine={null}
          />
          <Axis
            name="retention"
            title
            grid={null}
            line={{
              style: {
                stroke: '#ddd',
              },
            }}
            tickLine={{
              style: {
                stroke: '#ccc',
              },
              length: -5,
              alignTick: true,
            }}
          />
          <Geom
            type="line"
            position="elapsedTimeSinceLearing*retention"
            shape="smooth"
            tooltip={false}
            color={'type'}
          />
          <Point
            position="elapsedTimeSinceLearing*retention"
            shape="circle"
            color={'type'}
            tooltip={[
              'elapsedTimeSinceLearing*retention',
              (elapsedTimeSinceLearing, retention) => {
                let title = '';
                switch (elapsedTimeSinceLearing) {
                  case 0:
                    title = 'Immediate Recall';
                    break;
                  case 0.014:
                    title = '19 min';
                    break;
                  case 0.042:
                    title = '63 min';
                    break;
                  case 0.375:
                    title = '525 min';
                    break;
                  case 1:
                    title = '1 day';
                    break;
                  default:
                    title = `${elapsedTimeSinceLearing} days`;
                }
                return {
                  title,
                  name: 'retention',
                  value: `${retention}%`,
                };
              },
            ]}
          />
        </Chart>
      </div>
    </div>
  );
};

export default Ebbinghaus;
