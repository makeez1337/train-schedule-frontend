import { createAsyncThunk } from '@reduxjs/toolkit';

import { trainsService } from '../../services/trainsService';
import { ICreateTrain, ITrain } from '../../interfaces/train';

export const getAllTrainsThunk = createAsyncThunk<ITrain[], void>(
  'getAllTrainsThunk',
  async (_, { rejectWithValue }) => {
    try {
      const response = await trainsService.findAll();
      return response;
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

export const createTrainThunk = createAsyncThunk<void, ICreateTrain>(
  'createTrainThunk',
  async (data, { rejectWithValue }) => {
    try {
      await trainsService.create(data);
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);
