import { ProfileComponent } from './profile.component';
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { VideosComponent } from './videos/videos.component';
import { PlaylistsComponent } from './playlists/playlists.component';

export const PROFILE_ROUTES: Routes = [
  {
    path: '',
    component: ProfileComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'videos',
        component: VideosComponent,
      },
      {
        path: 'playlists',
        component: PlaylistsComponent,
      },
    ],
  },
];
