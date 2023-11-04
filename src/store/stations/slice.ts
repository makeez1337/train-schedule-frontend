import { createSlice } from '@reduxjs/toolkit';

import { IStation } from '../../interfaces/station';
import { getAllStationsThunk } from './thunk';

interface InitialState {
  stations: IStation[];
}

const initialState: InitialState = {
  stations: [],
};

export const stationsSlice = createSlice({
  name: 'stationsSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllStationsThunk.pending, (state) => {
        state.stations = [];
      })
      .addCase(getAllStationsThunk.fulfilled, (state, action) => {
        state.stations = action.payload;
      })
      .addCase(getAllStationsThunk.rejected, (state) => {
        state.stations = [];
      });
  },
});

export default stationsSlice.reducer;
