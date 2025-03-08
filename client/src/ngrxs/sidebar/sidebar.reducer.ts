import { createReducer, on } from '@ngrx/store';
import * as SidebarActions from './sidebar.actions';
import { SidebarState } from './sidebar.state';

const initialState: SidebarState = {
  isSidebarOpen: true,
};

export const sidebarReducer = createReducer(
  initialState,
  on(SidebarActions.toggleSidebar, (state) => {
    return {
      ...state,
      isSidebarOpen: !state.isSidebarOpen,
    };
  }),

  on(SidebarActions.setSidebarVisibility, (state, { isVisible }) => {
    return {
      ...state,
      isSidebarOpen: isVisible,
    };
  }),
);
