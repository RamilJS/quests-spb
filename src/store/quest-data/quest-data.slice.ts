import { createSlice } from '@reduxjs/toolkit';
import { fetchQuestAction } from '../api-actions';
import { NameSpace, Status } from '../../const';
import { DetailedQuest } from '../../types/quest';

type QestSlice = {
  quest: DetailedQuest | null;
  status: Status;
};

const initialState: QestSlice = {
  quest: null,
  status: Status.Inactive
};

export const questSlice = createSlice({
  name: NameSpace.Quest,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchQuestAction.pending, (state) => {
        state.status = Status.Loading;
      })
      .addCase(fetchQuestAction.fulfilled, (state, action) => {
        state.quest = action.payload;
        state.status = Status.Success;
      })
      .addCase(fetchQuestAction.rejected, (state) => {
        state.status = Status.Error;
      });
  }
});
