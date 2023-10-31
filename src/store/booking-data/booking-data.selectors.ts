import { BookingQuest, BookingQuests } from '../../types/booking-map';
import { NameSpace, Status } from '../../const';
import { State } from '../../types/state';

export const getBookingQuests = (state: State): BookingQuests => state[NameSpace.Booking].bookingQuest;
export const getCurrentQuest = (state: State): BookingQuest | null => state[NameSpace.Booking].currentQuest;
export const getBookingStatus = (state: State): Status => state[NameSpace.Booking].status;
