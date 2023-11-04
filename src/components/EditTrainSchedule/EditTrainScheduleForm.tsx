import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useFormik } from 'formik';
import dayjs, { Dayjs } from 'dayjs';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Button } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import {
  findTrainScheduleByIdThunk,
  updateTrainScheduleByIdThunk,
} from '../../store/train-schedule/thunk';
import { getAllTrainsThunk } from '../../store/trains/thunk';
import { getAllStationsThunk } from '../../store/stations/thunk';
import BasicDateTimePicker from '../../components/DateTimePicker';
import { trainScheduleService } from '../../services/trainScheduleService';
import { RequestState } from '../../interfaces/requestState';

interface InitialValues {
  departure_time: Dayjs | null;
  arrive_time: Dayjs | null;
  train_id: number;
  station_to_id: number;
  station_from_id: number;
}

export const EditTrainScheduleForm = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { trains } = useAppSelector((state) => state.trains);
  const { stations } = useAppSelector((state) => state.stations);
  const { trainSchedule, findTrainScheduleByIdRequestState } = useAppSelector(
    (state) => state.trainSchedule,
  );

  const initialValues: InitialValues = {
    departure_time: null,
    arrive_time: null,
    train_id: 0,
    station_to_id: 0,
    station_from_id: 0,
  };

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      if (id && values.arrive_time && values.departure_time) {
        dispatch(
          updateTrainScheduleByIdThunk({
            id,
            data: {
              ...values,
              arrive_time: values.arrive_time.toISOString(),
              departure_time: values.departure_time.toISOString(),
            },
          }),
        );
      }
    },
    enableReinitialize: true,
  });

  useEffect(() => {
    if (id) {
      dispatch(findTrainScheduleByIdThunk(id));
    }
  }, [id]);

  useEffect(() => {
    if (Object.keys(trainSchedule).length) {
      formik.setFieldValue(
        'departure_time',
        dayjs(trainSchedule.departure_time),
      );
      formik.setFieldValue('arrive_time', dayjs(trainSchedule.arrive_time));
      formik.setFieldValue('train_id', trainSchedule.train.id);
      formik.setFieldValue('station_to_id', trainSchedule.station_to.id);
      formik.setFieldValue('station_from_id', trainSchedule.station_from.id);
    }
  }, [trainSchedule]);

  useEffect(() => {
    dispatch(getAllTrainsThunk());
    dispatch(getAllStationsThunk());
  }, []);

  const deleteById = () => {
    if (id) {
      trainScheduleService.deleteById(id).then(() => {
        navigate('/train-schedule');
      });
    }
  };

  return (
    <div className="train-schedule-update">
      {findTrainScheduleByIdRequestState !== RequestState.rejected && (
        <form
          className="train-schedule-update__form"
          onSubmit={formik.handleSubmit}
        >
          <BasicDateTimePicker
            label="Departure time"
            field="departure_time"
            setFieldValue={formik.setFieldValue}
            date={formik.values.departure_time}
          />
          <BasicDateTimePicker
            label="Arrive time"
            field="arrive_time"
            setFieldValue={formik.setFieldValue}
            date={formik.values.arrive_time}
          />
          {stations.length > 0 && (
            <FormControl fullWidth>
              <InputLabel>Station from</InputLabel>
              <Select
                name="station_from_id"
                value={formik.values.station_from_id}
                label="Station from"
                onChange={formik.handleChange}
              >
                {stations.map((station) => (
                  <MenuItem key={station.id} value={station.id}>
                    {`Name: ${station.name} - City: ${station.city}`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          {stations.length > 0 && (
            <FormControl fullWidth>
              <InputLabel>Station to</InputLabel>
              <Select
                name="station_to_id"
                value={formik.values.station_to_id}
                label="Station to"
                onChange={formik.handleChange}
              >
                {stations.map((station) => (
                  <MenuItem key={station.id} value={station.id}>
                    {`Name: ${station.name} - City: ${station.city}`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          {trains.length > 0 && (
            <FormControl fullWidth>
              <InputLabel>Train</InputLabel>
              <Select
                name="train_id"
                value={formik.values.train_id}
                label="Train"
                onChange={formik.handleChange}
              >
                {trains.map((train) => (
                  <MenuItem key={train.id} value={train.id}>
                    {`Name: ${train.name} ; Type: ${train.type} ; Capacity: ${train.capacity}`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          <Button type="submit" variant="contained">
            Update
          </Button>
          <Button onClick={deleteById} variant="contained">
            Delete
          </Button>
        </form>
      )}
      {findTrainScheduleByIdRequestState === RequestState.rejected && (
        <p className="train-schedule-update__err">
          Train schedule with such id not found
        </p>
      )}
    </div>
  );
};
