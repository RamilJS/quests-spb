import { createAsyncThunk } from '@reduxjs/toolkit';
import { generatePath } from 'react-router-dom';
import { ThunkOptions } from '../types/state';
import { saveToken, dropToken } from '../services/token';
import { APIRoute, AppRoute } from '../const';
import { AuthorizedUser, AuthData } from '../types/user';
import { BookingData, BookingPostData } from '../types/booking';
import { pushNotification } from './notifications/notifications.slice';
import { DetailedQuest, Quest } from '../types/quest';
import { ReservationQuests } from '../types/booking';
import { BookingQuests } from '../types/booking-map';
import { redirectToRoute } from './action';

type Quests = Quest[];

export const checkAuthAction = createAsyncThunk<AuthorizedUser, undefined, ThunkOptions>(
  'user/checkAuth',
  async (_arg, {extra: api}) => {
    try {
      const {data} = await api.get<AuthorizedUser>(APIRoute.Login);
      return data;
    } catch {
      throw new Error();
    }
  }
);

export const loginAction = createAsyncThunk<void, AuthData, ThunkOptions>(
  'user/login',
  async ({email, password}, {dispatch, extra: api}) => {
    try {
      const {data: {token}} = await api.post<AuthorizedUser>(APIRoute.Login, {email, password});
      saveToken(token);
      dispatch(pushNotification({ type: 'success', message: 'Авторизация прошла успешно' }));
    } catch (error) {
      dispatch(pushNotification({ type: 'error', message: 'Ошибка авторизации' }));
      throw error;
    }
  },
);

export const logoutAction = createAsyncThunk<void, undefined, ThunkOptions>(
  'user/logout',
  async (_arg, { dispatch ,extra: api}) => {
    try {
      await api.delete(`${APIRoute.Logout}`);
      dropToken();
    } catch (err) {
      dispatch(pushNotification({ type: 'error', message: 'Сессия завершена с ошибкой' }));
      throw err;
    }
  },
);

export const fetchQuestAction = createAsyncThunk<DetailedQuest, string, ThunkOptions>(
  'data/fetchQuest',
  async (questId, { dispatch, extra: api }) => {
    try {
      const {data} = await api.get<DetailedQuest>(generatePath(APIRoute.Quest, { questId: questId.toString() }));

      return data;
    } catch (err) {
      dispatch(pushNotification({ type: 'error', message: 'Не удалось загрузить информацию о квесте' }));
      throw err;
    }
  }
);

export const fetchQuestsAction = createAsyncThunk<Quests, undefined, ThunkOptions>(
  'data/fetchQuests',
  async (_arg, { dispatch ,extra: api }) => {
    try {
      const { data } = await api.get<Quests>(APIRoute.Quests);
      return data;
    } catch (err) {
      dispatch(pushNotification({ type: 'error', message: 'Не удалось загрузить информацию о квестах' }));
      throw err;
    }
  }
);

export const fetchBookingQuestsAction = createAsyncThunk<BookingQuests, string, ThunkOptions>(
  'data/fetchBookingQuests',
  async (questId, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<BookingQuests>(generatePath(APIRoute.Booking, { id: questId.toString() }));
      return data;
    } catch (err) {
      dispatch(pushNotification({ type: 'error', message: 'Не удалось загрузить информацию о бронировании' }));
      throw err;
    }
  }
);

export const postBookingQuestAction = createAsyncThunk<BookingData, BookingPostData & {onSuccess: () => void}, ThunkOptions>(
  'data/postBookingQuest',
async ({ questId, bookingData, onSuccess }, { dispatch, extra: api }) => {
  try {
    const { data } = await api.post<BookingData>(generatePath(APIRoute.Booking, { id: questId.toString() }), bookingData);
    dispatch(pushNotification({ type: 'success', message: 'Квест забронирован' }));
    dispatch(redirectToRoute(AppRoute.MyBookings));
    onSuccess();
    return data;
  } catch (err) {
    dispatch(pushNotification({ type: 'error', message: 'Ошибка бронирования' }));
    throw err;
  }
}
);

export const fetchReservationQuestsAction = createAsyncThunk<ReservationQuests, undefined, ThunkOptions>(
  'data/fetchReservationQuests',
  async (_arg, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<ReservationQuests>(APIRoute.Reservation);
      return data;
    } catch (err) {
      dispatch(pushNotification({ type: 'error', message: 'Ошибка загрузки забронированных квестов' }));
      throw err;
    }
  }
);

export const deleteReservationQuestAction = createAsyncThunk<string, string, ThunkOptions>(
  'data/deleteReservationQuest',
  async (placeId, { dispatch, extra: api }) => {
    try {
      await api.delete(`${APIRoute.Reservation}/${placeId}`);
      dispatch(pushNotification({ type: 'info', message: 'Бронирование удалено' }));

      return placeId;
    } catch (err) {
      dispatch(pushNotification({ type: 'error', message: 'Ошибка удаления бронирования' }));
      throw err;
    }
  }
);

