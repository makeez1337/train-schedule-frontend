import { useFormik } from 'formik';
import { useEffect } from 'react';
import { Dayjs } from 'dayjs';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Button } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { getAllTrainsThunk } from '../../store/trains/thunk';
import { getAllStationsThunk } from '../../store/stations/thunk';
import BasicDateTimePicker from '../DateTimePicker';
import { createTrainScheduleThunk } from '../../store/train-schedule/thunk';
import { createTrainScheduleValidationSchema } from '../../validation/createTrainScheduleValidation';

interface InitialValues {
  departure_time: Dayjs | null;
  arrive_time: Dayjs | null;
  train_id: number;
  station_to_id: number;
  station_from_id: number;
}

export const CreateTrainScheduleForm = () => {
  const dispatch = useAppDispatch();
  const { trains } = useAppSelector((state) => state.trains);
  const { stations } = useAppSelector((state) => state.stations);

  const initialValues: InitialValues = {
    departure_time: null,
    arrive_time: null,
    train_id: 0,
    station_to_id: 0,
    station_from_id: 0,
  };

  const formik = useFormik({
    initialValues,
    validationSchema: createTrainScheduleValidationSchema,
    onSubmit: (values) => {
      const {
        departure_time,
        arrive_time,
        station_from_id,
        station_to_id,
        train_id,
      } = values;

      const isEveryValueTrue =
        departure_time &&
        arrive_time &&
        station_to_id &&
        station_from_id &&
        train_id;

      if (isEveryValueTrue) {
        dispatch(
          createTrainScheduleThunk({
            station_from_id,
            station_to_id,
            train_id,
            departure_time: departure_time.toISOString(),
            arrive_time: departure_time.toISOString(),
          }),
        );
      }
    },
  });

  useEffect(() => {
    dispatch(getAllTrainsThunk());
    dispatch(getAllStationsThunk());
  }, []);

  return (
    <div className="train-schedule-create">
      <h4 className="train-schedule-create__header">Create train schedule</h4>
      <form
        onSubmit={formik.handleSubmit}
        className="train-schedule-create-form"
      >
        <BasicDateTimePicker
          label="Departure time"
          field="departure_time"
          setFieldValue={formik.setFieldValue}
          date={formik.values.departure_time}
        />
        {formik.errors.departure_time && <p>{formik.errors.departure_time}</p>}
        <BasicDateTimePicker
          label="Arrive time"
          field="arrive_time"
          setFieldValue={formik.setFieldValue}
          date={formik.values.arrive_time}
        />
        {formik.errors.arrive_time && <p>{formik.errors.arrive_time}</p>}
        {stations.length && (
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
        {formik.errors.station_from_id && (
          <p>{formik.errors.station_from_id}</p>
        )}
        {stations.length && (
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
        {formik.errors.station_to_id && <p>{formik.errors.station_to_id}</p>}
        {trains.length && (
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
        {formik.errors.train_id && <p>{formik.errors.train_id}</p>}
        <Button type="submit" variant="contained">
          Create
        </Button>
      </form>
    </div>
  );
};
