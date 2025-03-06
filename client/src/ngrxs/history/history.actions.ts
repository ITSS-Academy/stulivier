import { createAction, props } from '@ngrx/store';
import { HistoryModel } from '../../models/history.model';

export const getHistoryByUserId = createAction(
  '[History] Get History By User Id',
  props<{ userId: string }>(),
);

export const getHistoryByUserIdSuccess = createAction(
  '[History] Get History By User Id Success',
  props<{ history: HistoryModel[] }>(),
);

export const getHistoryByUserIdFailure = createAction(
  '[History] Get History By User Id Failure',
  props<{ error: string }>(),
);

export const clearHistory = createAction('[History] Clear History');
