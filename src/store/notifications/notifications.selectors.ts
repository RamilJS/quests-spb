import { NameSpace } from '../../const';
import { Notification } from '../../types/notifications';
import { State } from '../../types/state';

export const getNotifications = (state: State): Notification[] => state[NameSpace.Notification].notifications;
