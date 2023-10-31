import { NameSpace } from '../../const';
import { DetailedQuest } from '../../types/quest';
import { State } from '../../types/state';
import { Status } from '../../const';

export const getQuest = (state: State): DetailedQuest | null => state[NameSpace.Quest].quest;
export const getStatus = (state: State): Status => state[NameSpace.Quest].status;
