import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () => import('./home/home.route').then((m) => m.HOME_ROUTES),
  },
  {
    path: 'history',
    loadChildren: () =>
      import('./history/history.route').then((m) => m.HISTORY_ROUTES),
  },
  {
    path: 'subscriptions',
    loadChildren: () =>
      import('./subscriptions/subscriptions.route').then(
        (m) => m.SUBSCRIPTIONS_ROUTES,
      ),
  },
  {
    path: 'watch/:id',
    loadChildren: () =>
      import('./watch/watch.route').then((m) => m.WATCH_ROUTES),
  },
  {
    path: 'you',
    loadChildren: () => import('./you/you.route').then((m) => m.YOU_ROUTES),
  },
  {
    path: 'playlists',
    loadChildren: () =>
      import('./playlist/playlist.route').then((m) => m.PLAYLIST_ROUTES),
  },
  {
    path: 'playlist/:id',
    loadChildren: () =>
      import('./playlist-detail/playlist-detail.route').then(
        (m) => m.PLAYLIST_DETAIL_ROUTES,
      ),
  },
  {
    path: 'watch-later',
    loadChildren: () =>
      import('./watch-later/watch-later.route').then(
        (m) => m.WATCH_LATER_ROUTES,
      ),
  },
];
