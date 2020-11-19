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
  View,
} from 'bizcharts';
import { Form } from 'antd';

import styles from './index.less';

export interface TimePoint {
  elapsedTimeSinceLearing: number;
  retention: number;
}

export interface EbbinghausProps {
  title?: React.ReactNode;
  data: number[];
  className?: string;
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
  //test
  {
    elapsedTimeSinceLearing: 5000,
    retention: 0,
  },
];

const defaultScale = {
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

const convertTimePoints = (timePoints: number[]): TimePoint[] =>
  timePoints
    .map((value, index, array) => {
      if (index === array.length - 1)
        return [
          {
            elapsedTimeSinceLearing: value,
            retention: 100,
          },
          {
            elapsedTimeSinceLearing: 5000,
            retention: 0,
          },
        ];
      return [
        {
          elapsedTimeSinceLearing: value,
          retention: 100,
        },
        {
          elapsedTimeSinceLearing: (array[index] + array[index + 1]) / 2,
          retention: 50 + index * 5 <= 65 ? 50 + index * 5 : 65,
        },
      ];
    })
    .flat();

const Ebbinghaus: React.FC<EbbinghausProps> = props => {
  const { title, data, className } = props;

  const scale = {
    ...defaultScale,
    elapsedTimeSinceLearing: {
      ...defaultScale.elapsedTimeSinceLearing,
      ticks: ((['', '', '', ''] as unknown) as [number, string]).concat(
        Array.from(new Set([1, 2, 6, 31, ...data])).sort((a, b) => a - b),
      ),
      max:
        (Array.from(new Set([1, 2, 6, 31, ...data]))
          .sort((a, b) => a - b)
          .pop() as number) + 5,
    },
  };

  return (
    <div className={styles.chart}>
      <div>
        <Form layout="vertical" className={className}>
          <Form.Item label={title} />
        </Form>

        <Chart height={300} autoFit scale={scale} padding={[10, 5, 30, 25]}>
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
          <View data={defaultData}>
            <Geom
              type="line"
              position="elapsedTimeSinceLearing*retention"
              shape="smooth"
              tooltip={false}
            />
            <Point
              position="elapsedTimeSinceLearing*retention"
              shape="circle"
              size={3}
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
            <Annotation.Text
              position={['50%', '65%']}
              content="non-intervention"
            />
          </View>
          <View data={convertTimePoints(data)}>
            <Geom
              type="line"
              position="elapsedTimeSinceLearing*retention"
              shape="smooth"
              tooltip={false}
              color="#5ad2ad"
            />
            <Annotation.Text
              position={['50%', '35%']}
              content="periodic review"
            />
          </View>
        </Chart>
        <div className={styles.annotation}></div>
      </div>
    </div>
  );
};

export default Ebbinghaus;
