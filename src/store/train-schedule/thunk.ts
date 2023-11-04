import { createAsyncThunk } from '@reduxjs/toolkit';
import { trainScheduleService } from '../../services/trainScheduleService';
import {
  ICreateTrainSchedule,
  ITrainSchedule,
  IUpdateTrainSchedule,
} from '../../interfaces/trainSchedule';

export const getTrainScheduleListThunk = createAsyncThunk(
  'getTrainScheduleListThunk',
  async (_, { rejectWithValue }) => {
    try {
      const response = await trainScheduleService.get();
      return response;
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

export const createTrainScheduleThunk = createAsyncThunk<
  void,
  ICreateTrainSchedule
>('createTrainScheduleThunk', async (data, { rejectWithValue, dispatch }) => {
  try {
    await trainScheduleService.create(data);
    dispatch(getTrainScheduleListThunk());
  } catch (e) {
    return rejectWithValue(e);
  }
});

export const findTrainScheduleByIdThunk = createAsyncThunk<
  ITrainSchedule,
  string
>('findTrainScheduleByIdThunk', async (id, { rejectWithValue }) => {
  try {
    const response = await trainScheduleService.findById(id);
    return response;
  } catch (e) {
    return rejectWithValue(e);
  }
});

export const updateTrainScheduleByIdThunk = createAsyncThunk<
  void,
  { id: string; data: IUpdateTrainSchedule }
>(
  'updateTrainScheduleByIdThunk',
  async ({ id, data }, { rejectWithValue, dispatch }) => {
    try {
      await trainScheduleService.updateById(id, data);
      dispatch(findTrainScheduleByIdThunk(id));
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);
