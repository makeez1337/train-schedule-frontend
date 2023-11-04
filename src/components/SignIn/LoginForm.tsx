import { Button, TextField } from '@mui/material';
import { useFormik } from 'formik';

import { useAppDispatch } from '../../hooks/reduxHooks';
import { signInThunk, signUpThunk } from '../../store/auth/thunk';
import { loginValidationSchema } from '../../validation/loginValidation';

import '../../styles/SignIn/login-form.scss';

export const LoginForm = () => {
  const dispatch = useAppDispatch();

  const initialValues = { username: '', password: '' };

  const formik = useFormik({
    initialValues,
    onSubmit: (credentials) => {
      dispatch(signInThunk(credentials));
    },
    validationSchema: loginValidationSchema,
  });

  const isDisabled = Boolean(Object.keys(formik.errors).length);

  return (
    <form onSubmit={formik.handleSubmit} className="login">
      <TextField
        name="username"
        onChange={formik.handleChange}
        style={{ width: '80%' }}
        label="Username"
        variant="standard"
      />
      {formik.errors.username && <p>{formik.errors.username}</p>}
      <TextField
        name="password"
        onChange={formik.handleChange}
        style={{ width: '80%' }}
        label="Password"
        variant="standard"
        type="password"
      />
      {formik.errors.password && <p>{formik.errors.password}</p>}
      <div className="login__buttons-wrap">
        <Button
          disabled={isDisabled}
          type="submit"
          style={{ marginTop: '10px' }}
          variant="contained"
        >
          Sign In
        </Button>
        <Button
          disabled={isDisabled}
          onClick={() => dispatch(signUpThunk(formik.values))}
          style={{ marginTop: '10px' }}
          variant="contained"
        >
          Sign Up
        </Button>
      </div>
    </form>
  );
};
