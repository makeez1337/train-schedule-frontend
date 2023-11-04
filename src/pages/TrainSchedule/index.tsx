import { TrainScheduleList } from '../../components/TrainSchedule/TrainScheduleList';
import { CreateTrainScheduleForm } from '../../components/TrainSchedule/CreateTrainScheduleForm';

import '../../styles/TrainSchedule/train-schedule.scss';

export const TrainSchedule = () => {
  return (
    <div className="train-schedule">
      <CreateTrainScheduleForm />
      <h1 className="train-schedule__header">Train schedule</h1>
      <TrainScheduleList />
    </div>
  );
};
