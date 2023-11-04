import { createAsyncThunk } from '@reduxjs/toolkit';

import { ICreateStation, IStation } from '../../interfaces/station';
import { stationsService } from '../../services/stationsService';

export const getAllStationsThunk = createAsyncThunk<IStation[], void>(
  'getAllStationsThunk',
  async (_, { rejectWithValue }) => {
    try {
      const response = await stationsService.findAll();
      return response;
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

export const createStationThunk = createAsyncThunk<void, ICreateStation>(
  'createStationThunk',
  async (data, { rejectWithValue }) => {
    try {
      await stationsService.create(data);
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);
