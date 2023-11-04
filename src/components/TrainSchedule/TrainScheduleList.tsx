import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { getTrainScheduleListThunk } from '../../store/train-schedule/thunk';
import { TrainScheduleItem } from './TrainScheduleItem';

export const TrainScheduleList = () => {
  const dispatch = useAppDispatch();
  const { trainScheduleList } = useAppSelector((state) => state.trainSchedule);

  useEffect(() => {
    dispatch(getTrainScheduleListThunk());
  }, []);

  return (
    <div className="train-schedule__list">
      {trainScheduleList.length > 0 &&
        trainScheduleList.map((item) => (
          <TrainScheduleItem key={item.id} item={item} />
        ))}
    </div>
  );
};
