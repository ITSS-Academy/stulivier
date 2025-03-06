import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import * as HistoryActions from './history.actions';
import { HistoryService } from '../../services/history.service';

export const getHistoryByUserId$ = createEffect(
  () => {
    const actions$ = inject(Actions);
    const historyService = inject(HistoryService);
    return actions$.pipe(
      ofType(HistoryActions.getHistoryByUserId),
      exhaustMap((action) => {
        return historyService.getAllHistory(action.userId).pipe(
          map((response) =>
            HistoryActions.getHistoryByUserIdSuccess({
              history: response,
            }),
          ),
          catchError((obj) => {
            return of(
              HistoryActions.getHistoryByUserIdFailure({
                error: obj.error.message,
              }),
            );
          }),
        );
      }),
    );
  },
  { functional: true },
);
