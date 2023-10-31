import { createSlice } from '@reduxjs/toolkit';
import { deleteReservationQuestAction, fetchReservationQuestsAction } from '../api-actions';
import { NameSpace, Status } from '../../const';
import { ReservationQuests } from '../../types/booking';

type ReservationQuestsSlice = {
  quests: ReservationQuests;
  status: Status;
};

const initialState: ReservationQuestsSlice = {
  quests: [],
  status: Status.Inactive
};

export const reservationQuestsSlice = createSlice({
  name: NameSpace.Reservation,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchReservationQuestsAction.pending, (state) => {
        state.status = Status.Loading;
      })
      .addCase(fetchReservationQuestsAction.fulfilled, (state, action) => {
        state.quests = action.payload;
        state.status = Status.Success;
      })
      .addCase(fetchReservationQuestsAction.rejected, (state) => {
        state.status = Status.Error;
      })
      .addCase(deleteReservationQuestAction.fulfilled, (state, action) => {
        state.quests = state.quests.filter((quest) => quest.id !== action.payload);
      });
  }
});
