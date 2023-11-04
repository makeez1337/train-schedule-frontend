import * as Yup from 'yup';

export const createStationValidationSchema = Yup.object({
  name: Yup.string()
    .min(3, 'Name must have a minimum of 3 characters')
    .required(),
  city: Yup.string()
    .min(3, 'City must have a minimum of 3 characters')
    .required(),
});
