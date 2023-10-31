import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { userDataSlice } from './user-data/user-data.slice';
import { questSlice } from './quest-data/quest-data.slice';
import { questsSlice } from './quests-data/quests-data.slice';
import { bookingSlice } from './booking-data/booking-data.slice';
import { questsFilterSlice } from './quests-filter-data/quests-filter.slice';
import { notificationsSlice } from './notifications/notifications.slice';
import { reservationQuestsSlice } from './reservations-data/reservation-data.slice';

export const rootReducer = combineReducers({
  [NameSpace.User]: userDataSlice.reducer,
  [NameSpace.Quest]: questSlice.reducer,
  [NameSpace.Quests]: questsSlice.reducer,
  [NameSpace.Filter]: questsFilterSlice.reducer,
  [NameSpace.Booking]: bookingSlice.reducer,
  [NameSpace.Notification]: notificationsSlice.reducer,
  [NameSpace.Reservation]: reservationQuestsSlice.reducer
});

