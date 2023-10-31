import { createSlice } from '@reduxjs/toolkit';
import { AuthorizedUser } from '../../types/user';
import { checkAuthAction, loginAction, logoutAction } from '../api-actions';
import { AuthorizationStatus, NameSpace, Status } from '../../const';

type UserProcessSlice = {
  authorizationStatus: AuthorizationStatus;
  userData: AuthorizedUser | null;
  fetchStatus: Status;
}

const initialState: UserProcessSlice = {
  authorizationStatus: AuthorizationStatus.Unknown,
  userData: null,
  fetchStatus: Status.Inactive
};

export const userDataSlice = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(checkAuthAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.userData = action.payload ?? null;
        state.fetchStatus = Status.Success;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.fetchStatus = Status.Error;

      })
      .addCase(checkAuthAction.pending, (state) => {
        state.fetchStatus = Status.Loading;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.userData = action.payload ?? null;
      })
      .addCase(loginAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.userData = null;
      });
  }
});
