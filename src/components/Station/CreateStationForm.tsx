import { useAppDispatch } from '../../hooks/reduxHooks';
import { useFormik } from 'formik';
import { Button, TextField } from '@mui/material';

import { createStationValidationSchema } from '../../validation/createStationValidation';
import { createStationThunk } from '../../store/stations/thunk';

interface InitialValues {
  name: string;
  city: string;
}

export const CreateStationForm = () => {
  const dispatch = useAppDispatch();

  const initialValues: InitialValues = {
    name: '',
    city: '',
  };

  const formik = useFormik({
    initialValues,
    onSubmit: (values, formikHelpers) => {
      dispatch(createStationThunk(values));
      formikHelpers.resetForm();
    },
    validationSchema: createStationValidationSchema,
  });

  return (
    <div className="station-create">
      <form onSubmit={formik.handleSubmit} className="station-create__form">
        <TextField
          name="name"
          onChange={formik.handleChange}
          label="Station name"
          variant="standard"
          value={formik.values.name}
        />
        {formik.errors.name && <p>{formik.errors.name}</p>}
        <TextField
          name="city"
          onChange={formik.handleChange}
          label="Station city"
          variant="standard"
          value={formik.values.city}
        />
        {formik.errors.name && <p>{formik.errors.city}</p>}
        <Button type="submit" variant="contained">
          Create
        </Button>
      </form>
    </div>
  );
};
