import { Icon } from 'leaflet';

export const AUTH_TOKEN_KEY_NAME = 'escape-room-token';
export const STEP = -1;

export const CONTACTS_MAP_ZOOM = 16;
export const BOOKING_MAP_ZOOM = 12;

export const enum AppRoute {
  Main = '/',
  Login = '/login',
  Logout = '/logout',
  Contacts = '/contacts',
  Booking = '/quest/:id/booking',
  MyBookings = '/my-quests',
  Quest = '/quest',
  QuestInfo = '/quest/:id',
  NotFound = '/not-found-screen',
}

export enum APIRoute {
  Reservation = '/reservation',
  MyBookings = '/my-quests',
  Canceling = '/my-quests/:my-questsId',
  Quests = '/quest',
  Quest = '/quest/:questId',
  Booking = '/quest/:id/booking',
  Login = '/login',
  Logout = '/logout',
}

export const enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum NameSpace {
  Quests = 'QUESTS',
  Quest = 'QUEST',
  Booking = 'BOOKING',
  Reservation = 'RESERVATION',
  User = 'USER',
  Notification = 'NOTIFICATION',
  Filter = 'FILTER'
}

export enum Status {
  Inactive = 'inactive',
  Loading = 'loading',
  Success = 'success',
  Error = 'error'
}

export enum ContactsMapLocation {
  lat = 59.968456,
  lng = 30.31759,
}

export const defaultCustomIcon = new Icon({
  iconUrl: '/img/svg/pin-default.svg',
  iconSize: [23, 42],
  iconAnchor: [11.5, 42]
});

export const currentCustomIcon = new Icon({
  iconUrl: '/img/svg/pin-active.svg',
  iconSize: [23, 42],
  iconAnchor: [11.5, 42]

});

export const LoginValidationPattern = {
  Email: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i,
  Password: /^(?=.*[a-zA-Z])(?=.*\d).{3,15}$/g,
} as const;

export const BookingValidationForm = {
  Name: /^.{1,15}$/,
  Telephone: /^(\+[7]|[8])?((\d{2,3}) ?\d|\d)(([ -]?\d)|( ?(\d{2,3}) ?)){8,12}\d$/,
} as const;

export enum QuestLevel {
  Easy = 'easy',
  Medium = 'medium',
  Hard = 'hard',
  Any = 'any'
}

export enum QuestType {
  Adventures = 'adventures',
  Horror = 'horror',
  Mystic = 'mystic',
  Detective = 'detective',
  SciFi = 'sci-fi',
  AllTypes = 'all-types'
}

export const TypeFilter: Record<QuestType, string> = {
  [QuestType.AllTypes]: 'Все квесты',
  [QuestType.Adventures]: 'Приключения',
  [QuestType.Detective]: 'Детектив',
  [QuestType.Horror]: 'Ужасы',
  [QuestType.Mystic]: 'Мистика',
  [QuestType.SciFi]: 'Sci-Fi',
} as const;


export const LevelFilter: Record<QuestLevel, string> = {
  [QuestLevel.Any]: 'Любой',
  [QuestLevel.Easy]: 'Легкий',
  [QuestLevel.Medium]: 'Средний',
  [QuestLevel.Hard]: 'Сложный',
} as const;

export enum DateSlot {
  Today = 'today',
  Tomorrow = 'tomorrow',
}

export const SlotName: Record<string, string> = {
  [DateSlot.Today]: 'Сегодня',
  [DateSlot.Tomorrow]: 'Завтра'
} as const;

