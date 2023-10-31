import { NameSpace } from '../../const';
import { State } from '../../types/state';

export const getLevel = (state: State) => state[NameSpace.Filter].activeLevel;
export const getType = (state: State) => state[NameSpace.Filter].activeType;
