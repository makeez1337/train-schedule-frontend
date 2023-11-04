import { createAsyncThunk } from '@reduxjs/toolkit';

import { authService } from '../../services/authService';
import { IUser } from '../../interfaces/user';
import { ICredentials } from '../../interfaces/credentials';
import { IJwtTokens } from '../../interfaces/jwtTokens';

export const signInThunk = createAsyncThunk<IUser & IJwtTokens, ICredentials>(
  'signInThunk',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await authService.signIn(credentials);
      localStorage.setItem('access_token', `Bearer ${response.access_token}`);
      localStorage.setItem('refresh_token', response.refresh_token);

      return response;
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

export const signUpThunk = createAsyncThunk<void, ICredentials>(
  'signUpThunk',
  async (credentials, { rejectWithValue }) => {
    try {
      await authService.signUp(credentials);
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

export const signOutThunk = createAsyncThunk<void, string>(
  'signOutThunk',
  async (refreshToken, { rejectWithValue }) => {
    try {
      await authService.signOut(refreshToken);
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);
