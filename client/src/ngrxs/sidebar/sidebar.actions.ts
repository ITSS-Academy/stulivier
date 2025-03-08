import { createAction, props } from '@ngrx/store';

export const toggleSidebar = createAction('[Sidebar] Toggle');

export const setSidebarVisibility = createAction(
  '[Sidebar] Set Visibility',
  props<{ isVisible: boolean }>(),
);
