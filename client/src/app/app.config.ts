import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { environment } from '../environments/environment';
import { provideHttpClient } from '@angular/common/http';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { authReducer } from '../ngrxs/auth/auth.reducer';
import * as AuthEffects from '../ngrxs/auth/auth.effects';
import * as UserEffects from '../ngrxs/user/user.effects';
import * as VideoEffects from '../ngrxs/video/video.effects';
import * as PlaylistEffects from '../ngrxs/playlist/playlist.effects';
import * as CategoryEffects from '../ngrxs/category/category.effects';
import * as CommentEffects from '../ngrxs/comment/comment.effects';
import * as HistoryEffects from '../ngrxs/history/history.effects';
import { HttpClientAuth } from '../utils/http-client-auth';
import { userReducer } from '../ngrxs/user/user.reducer';
import { videoReducer } from '../ngrxs/video/video.reducer';
import { playlistReducer } from '../ngrxs/playlist/playlist.reducer';
import { categoryReducer } from '../ngrxs/category/category.reducer';
import { commentReducer } from '../ngrxs/comment/comment.reducer';
import { historyReducer } from '../ngrxs/history/history.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    HttpClientAuth,
    provideStore({
      auth: authReducer,
      user: userReducer,
      video: videoReducer,
      playlist: playlistReducer,
      category: categoryReducer,
      comment: commentReducer,
      history: historyReducer,
    }),
    provideEffects(
      AuthEffects,
      UserEffects,
      VideoEffects,
      PlaylistEffects,
      CategoryEffects,
      CommentEffects,
      HistoryEffects,
    ),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()),
    provideAnimationsAsync(),
    importProvidersFrom(
      SocketIoModule.forRoot(environment.socketIoConfig as SocketIoConfig),
    ),
    provideAnimationsAsync(),
  ],
};
