import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { useFormik } from 'formik';

import { TrainType } from '../../interfaces/train';
import { createTrainValidationSchema } from '../../validation/createTrainValidation';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { createTrainThunk } from '../../store/trains/thunk';

interface InitialValues {
  name: string;
  type: TrainType;
  capacity: number;
}

export const CreateTrainForm = () => {
  const dispatch = useAppDispatch();

  const initialValues: InitialValues = {
    name: '',
    type: TrainType.passenger,
    capacity: 0,
  };

  const formik = useFormik({
    initialValues,
    validationSchema: createTrainValidationSchema,
    onSubmit: (values, formikHelpers) => {
      dispatch(createTrainThunk(values));
      formikHelpers.resetForm();
    },
  });

  const handleNumberInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    formik.setFieldValue(name, Number(value));
  };

  return (
    <div className="train-create">
      <form className="train-create__form" onSubmit={formik.handleSubmit}>
        <TextField
          name="name"
          onChange={formik.handleChange}
          label="Train name"
          variant="standard"
          value={formik.values.name}
        />
        {formik.errors.name && <p>{formik.errors.name}</p>}
        <FormControl fullWidth>
          <InputLabel>Train type</InputLabel>
          <Select
            value={formik.values.type}
            label="Train type"
            onChange={formik.handleChange}
          >
            <MenuItem value={TrainType.passenger}>Passenger</MenuItem>
            <MenuItem value={TrainType.high_speed}>High speed</MenuItem>
          </Select>
        </FormControl>
        {formik.errors.type && <p>{formik.errors.type}</p>}
        <TextField
          name="capacity"
          type="number"
          label="Capacity"
          value={formik.values.capacity}
          onChange={handleNumberInputChange}
        />
        {formik.errors.capacity && <p>{formik.errors.capacity}</p>}
        <Button type="submit" variant="contained">
          Create
        </Button>
      </form>
    </div>
  );
};
