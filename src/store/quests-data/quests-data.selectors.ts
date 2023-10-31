import { Quest } from '../../types/quest';
import { State } from '../../types/state';
import { NameSpace, Status } from '../../const';

type Quests = Quest[];

export const getQuests = (state: State): Quests => state[NameSpace.Quests].quests;
export const getStatus = (state: State): Status => state[NameSpace.Quests].status;
