import { createSlice } from '@reduxjs/toolkit';

import { IUser } from '../../interfaces/user';
import { signInThunk, signOutThunk } from './thunk';
import { RequestState } from '../../interfaces/requestState';

interface InitialState {
  user: IUser;
  isAuthorized: boolean;
  signInRequestState: null | RequestState;
}

const initialState: InitialState = {
  user: {} as IUser,
  isAuthorized: false,
  signInRequestState: null,
};

export const authSlice = createSlice({
  initialState,
  name: 'authSlice',
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signInThunk.pending, (state) => {
        state.signInRequestState = RequestState.pending;
      })
      .addCase(signInThunk.fulfilled, (state, action) => {
        state.isAuthorized = true;
        state.user = {
          id: action.payload.id,
          username: action.payload.username,
        };
        state.signInRequestState = RequestState.fulfilled;
      })
      .addCase(signInThunk.rejected, (state) => {
        state.isAuthorized = false;
        state.user = {} as IUser;
        state.signInRequestState = RequestState.rejected;
      });
    builder
      .addCase(signOutThunk.fulfilled, (state) => {
        state.isAuthorized = false;
        state.user = {} as IUser;
      })
      .addCase(signOutThunk.rejected, (state) => {
        state.isAuthorized = false;
        state.user = {} as IUser;
      });
  },
});

export default authSlice.reducer;
