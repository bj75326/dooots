import React, { memo, useMemo, useCallback } from 'react';
import { Chart, Line, Point, Tooltip, Axis } from 'bizcharts';
import moment from 'moment';

export interface RatingRecordsProps {
  data: {
    deckId: string;
    cardId: string;
    rateTimestamp: number;
    rate: number;
  }[];
}

const RatingRecords: React.FC<RatingRecordsProps> = props => {
  const { data } = props;

  const scale = useMemo(
    () => ({
      rate: {
        type: 'linear',
        min: 0,
        max: 5,
        tickInterval: 1,
      },
      rateTimestamp: {
        type: 'timeCat',
        formatter(value: number) {
          return moment(value).format('YYYY-MM-DD hh:mm:ss');
        },
      },
    }),
    [],
  );

  return (
    <Chart
      padding={[10, 20, 20, 20]}
      autoFit
      height={220}
      data={data}
      scale={scale}
    >
      <Line position="rateTimestamp*rate" />
      <Point position="rateTimestamp*rate" />
      <Tooltip />
      <Axis name="rate" />
      <Axis name="rateTimestamp" />
    </Chart>
  );
};

export default RatingRecords;
