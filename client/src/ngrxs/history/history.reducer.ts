import { createReducer, on } from '@ngrx/store';
import { HistoryState } from './history.state';
import * as HistoryActions from './history.actions';

const initialState: HistoryState = {
  history: [],

  isGettingAllVideosInHistory: false,
  isGettingAllVideosInHistorySuccess: false,
  isGettingAllVideosInHistoryFailure: false,
};

export const historyReducer = createReducer(
  initialState,
  on(HistoryActions.getHistoryByUserId, (state, action) => {
    return <HistoryState>{
      ...state,
      isGettingAllVideosInHistory: true,
    };
  }),

  on(HistoryActions.getHistoryByUserIdSuccess, (state, action) => {
    return <HistoryState>{
      ...state,
      isGettingAllVideosInHistory: false,
      isGettingAllVideosInHistorySuccess: true,
      history: action.history,
    };
  }),

  on(HistoryActions.getHistoryByUserIdFailure, (state, action) => {
    return <HistoryState>{
      ...state,
      isGettingAllVideosInHistory: false,
      isGettingAllVideosInHistoryFailure: true,
    };
  }),

  on(HistoryActions.clearHistory, (state, action) => {
    return <HistoryState>{
      ...state,
      history: [],
      isGettingAllVideosInHistory: false,
      isGettingAllVideosInHistorySuccess: false,
      isGettingAllVideosInHistoryFailure: false,
    };
  }),
);
