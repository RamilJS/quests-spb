import { NameSpace, Status } from '../../const';
import { ReservationQuests } from '../../types/booking';
import { State } from '../../types/state';

export const getReservationQuests = (state: State): ReservationQuests => state[NameSpace.Reservation].quests;
export const getStatus = (state: State): Status => state[NameSpace.Reservation].status;
