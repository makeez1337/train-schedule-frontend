import { createSlice } from '@reduxjs/toolkit';

import { ITrainSchedule } from '../../interfaces/trainSchedule';
import { findTrainScheduleByIdThunk, getTrainScheduleListThunk } from './thunk';
import { RequestState } from '../../interfaces/requestState';

interface InitialState {
  trainScheduleList: ITrainSchedule[];
  trainSchedule: ITrainSchedule;
  findTrainScheduleByIdRequestState: RequestState | null;
}

const initialState: InitialState = {
  trainScheduleList: [],
  trainSchedule: {} as ITrainSchedule,
  findTrainScheduleByIdRequestState: null,
};

export const trainScheduleSlice = createSlice({
  initialState,
  name: 'trainScheduleSlice',
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTrainScheduleListThunk.pending, (state) => {
        state.trainScheduleList = [];
      })
      .addCase(getTrainScheduleListThunk.fulfilled, (state, action) => {
        state.trainScheduleList = action.payload;
      })
      .addCase(getTrainScheduleListThunk.rejected, (state) => {
        state.trainScheduleList = [];
      });
    builder
      .addCase(findTrainScheduleByIdThunk.pending, (state) => {
        state.trainSchedule = {} as ITrainSchedule;
        state.findTrainScheduleByIdRequestState = RequestState.pending;
      })
      .addCase(findTrainScheduleByIdThunk.fulfilled, (state, action) => {
        state.trainSchedule = action.payload;
        state.findTrainScheduleByIdRequestState = RequestState.fulfilled;
      })
      .addCase(findTrainScheduleByIdThunk.rejected, (state) => {
        state.trainSchedule = {} as ITrainSchedule;
        state.findTrainScheduleByIdRequestState = RequestState.rejected;
      });
  },
});

export default trainScheduleSlice.reducer;
