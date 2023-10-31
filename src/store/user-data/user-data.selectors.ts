import { NameSpace, Status, AuthorizationStatus } from '../../const';
import { State } from '../../types/state';

export const getAuthorizationStatus = (state: State): AuthorizationStatus => state[NameSpace.User].authorizationStatus;
export const getFetchStatus = (state: State): Status => state[NameSpace.User].fetchStatus;
