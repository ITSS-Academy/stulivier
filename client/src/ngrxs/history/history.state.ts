import { HistoryModel } from '../../models/history.model';

export interface HistoryState {
  history: HistoryModel[];

  isGettingAllVideosInHistory: boolean;
  isGettingAllVideosInHistorySuccess: boolean;
  isGettingAllVideosInHistoryFailure: boolean;
}
