import * as Yup from 'yup';

export const loginValidationSchema = Yup.object({
  username: Yup.string().min(4).required('This field is required'),
  password: Yup.string().min(6).required('This field is required'),
});
