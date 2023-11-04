import dayjs from 'dayjs';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

import { ITrainSchedule } from '../../interfaces/trainSchedule';

interface Props {
  item: ITrainSchedule;
}

export const TrainScheduleItem = ({
  item: { train, station_from, station_to, departure_time, arrive_time, id },
}: Props) => {
  return (
    <div className="train-schedule-item">
      <div>
        <span className="train-schedule-item__field">Train data:</span>
        <p>
          <span className="train-schedule-item__field">Type:</span> {train.type}
        </p>
        <p>
          <span className="train-schedule-item__field">Name:</span> {train.name}
        </p>
        <p>
          <span className="train-schedule-item__field">Capacity:</span>{' '}
          {train.capacity}
        </p>
      </div>
      <div>
        <span className="train-schedule-item__field">Station from:</span>
        <p>
          <span className="train-schedule-item__field">Name:</span>{' '}
          {station_from.name}
        </p>
        <p>
          <span className="train-schedule-item__field">City:</span>{' '}
          {station_from.city}
        </p>
      </div>
      <div>
        <span className="train-schedule-item__field">Station to:</span>
        <p>
          <span className="train-schedule-item__field">Name:</span>{' '}
          {station_to.name}
        </p>
        <p>
          <span className="train-schedule-item__field">City:</span>{' '}
          {station_to.city}
        </p>
      </div>
      <div>
        <span className="train-schedule-item__field">Departure time:</span>{' '}
        <p>{dayjs(departure_time).format('DD-MM-YYYY HH:mm')}</p>
        <span className="train-schedule-item__field">Arrive time:</span>{' '}
        <p>{dayjs(arrive_time).format('DD-MM-YYYY HH:mm')}</p>
      </div>
      <Link to={id.toString()}>
        <Button style={{ height: '100%' }} variant="contained">
          Edit
        </Button>
      </Link>
    </div>
  );
};
