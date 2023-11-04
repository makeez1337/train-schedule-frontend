import { createSlice } from '@reduxjs/toolkit';

import { ITrain } from '../../interfaces/train';
import { getAllTrainsThunk } from './thunk';

interface InitialState {
  trains: ITrain[];
}

const initialState: InitialState = {
  trains: [],
};

export const trainsSlice = createSlice({
  name: 'trainsSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllTrainsThunk.pending, (state) => {
        state.trains = [];
      })
      .addCase(getAllTrainsThunk.fulfilled, (state, action) => {
        state.trains = action.payload;
      })
      .addCase(getAllTrainsThunk.rejected, (state) => {
        state.trains = [];
      });
  },
});

export default trainsSlice.reducer;
