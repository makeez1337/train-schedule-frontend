import * as Yup from 'yup';

export const createTrainScheduleValidationSchema = Yup.object({
  departure_time: Yup.object().required('Choose any time'),
  arrive_time: Yup.object().required('Choose any time'),
  train_id: Yup.number().min(1, 'Choose any train'),
  station_to_id: Yup.number().min(1, 'Choose any station'),
  station_from_id: Yup.number().min(1, 'Choose any station'),
});
