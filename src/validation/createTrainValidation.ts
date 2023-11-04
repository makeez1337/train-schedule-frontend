import * as Yup from 'yup';

import { TrainType } from '../interfaces/train';

export const createTrainValidationSchema = Yup.object({
  name: Yup.string()
    .min(3, 'Name must have a minimum of 3 characters')
    .required(),
  type: Yup.mixed().oneOf([TrainType.high_speed, TrainType.passenger]),
  capacity: Yup.number().min(10, 'Min capacity is 10'),
});
