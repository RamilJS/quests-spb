import { createSlice } from '@reduxjs/toolkit';
import { LevelFilter, NameSpace } from '../../const';
import { TypeFilter } from '../../const';

type QuestsFilterSlice = {
  activeType: string;
  activeLevel: string;
}

export const initialState: QuestsFilterSlice = {
  activeType: TypeFilter['all-types'],
  activeLevel: LevelFilter.any,
};

export const questsFilterSlice = createSlice({
  name: NameSpace.Filter,
  initialState,
  reducers: {
    chooseType(state, action: { payload: string }) {
      state.activeType = action.payload;
    },
    chooseLevel(state, action: { payload: string }) {
      state.activeLevel = action.payload;
    }
  },
});

export const { chooseType, chooseLevel } = questsFilterSlice.actions;
