import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { getTrainScheduleListThunk } from '../../store/train-schedule/thunk';
import { TrainScheduleItem } from './TrainScheduleItem';
import { SortOptions } from '../../interfaces/sortOptions';
import { useSearchParams } from 'react-router-dom';

export const TrainScheduleList = () => {
  const dispatch = useAppDispatch();
  const { trainScheduleList } = useAppSelector((state) => state.trainSchedule);
  const [searchParams, setSearchParams] = useSearchParams();

  const arrive_time = searchParams.get('arrive_time');

  useEffect(() => {
    if (arrive_time) {
      dispatch(
        getTrainScheduleListThunk({ arrive_time: arrive_time as SortOptions }),
      );
    } else {
      dispatch(getTrainScheduleListThunk());
    }
  }, [arrive_time]);

  return (
    <div className="train-schedule__list">
      <FormControl>
        <FormLabel>Sort by arrive time</FormLabel>
        <RadioGroup
          value={arrive_time}
          onChange={(e) => {
            const value = e.target.value;

            setSearchParams((params) => {
              params.set('arrive_time', value);
              return params;
            });
          }}
          defaultValue={null}
        >
          <FormControlLabel
            value={SortOptions.asc}
            control={<Radio />}
            label="Asc"
          />
          <FormControlLabel
            value={SortOptions.desc}
            control={<Radio />}
            label="Desc"
          />
        </RadioGroup>
      </FormControl>
      {trainScheduleList.length > 0 &&
        trainScheduleList.map((item) => (
          <TrainScheduleItem key={item.id} item={item} />
        ))}
    </div>
  );
};
