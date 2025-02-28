import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../services/theme.service';
import { MaterialModule } from '../shared/modules/material.module';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { NgClass } from '@angular/common';
import { JWTTokenService } from '../services/jwttoken.service';
import { SessionStorageService } from '../services/session-storage.service';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { Store } from '@ngrx/store';
import { AuthState } from '../ngrxs/auth/auth.state';
import { UserState } from '../ngrxs/user/user.state';
import * as AuthActions from '../ngrxs/auth/auth.actions';
import * as UserActions from '../ngrxs/user/user.actions';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MaterialModule,
    SidebarComponent,
    HeaderComponent,
    RouterOutlet,
    NgClass,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'Vidora';
  currentUrl = '';

  isSlideBarVisible = true;
  isHiddenSidebar = false;

  constructor(
    private router: Router,
    private jwtTokenService: JWTTokenService,
    private sessionStorageService: SessionStorageService,
    private themeService: ThemeService,
    private auth: Auth,
    private store: Store<{
      auth: AuthState;
      user: UserState;
    }>,
  ) {
    onAuthStateChanged(this.auth, async (user) => {
      console.log('user', user);
      if (user) {
        const token = await user.getIdTokenResult();
        this.store.dispatch(AuthActions.storeIdToken({ idToken: token.token }));
        this.jwtTokenService.setToken(token.token);
      }
    });
    if (this.sessionStorageService.getValueFromSession('idToken') != '') {
      this.jwtTokenService.setToken(
        this.sessionStorageService.getValueFromSession('idToken'),
      );
      if (this.jwtTokenService.isTokenExpired()) {
        this.sessionStorageService.removeTokenInSession();
        return;
      }
      this.store.dispatch(
        AuthActions.storeIdToken({
          idToken: this.sessionStorageService.getValueFromSession('idToken'),
        }),
      );
    }
  }

  onMenuClick(): void {
    if (this.currentUrl.includes('/watch/')) {
      this.isHiddenSidebar = !this.isHiddenSidebar;
    } else {
      this.isSlideBarVisible = !this.isSlideBarVisible;
    }
  }

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.url;
        // Kiểm tra nếu URL là '/watch'
        if (event.url.includes('/watch/')) {
          this.isHiddenSidebar = false;
          this.isSlideBarVisible = true;
        }
      }
    });
    this.store.select('auth', 'idToken').subscribe((val) => {
      if (val != '') {
        this.jwtTokenService.setToken(val);
        this.store.dispatch(UserActions.getUserById());
      }
    });
    this.store.select('user', 'getUserErrorMessage').subscribe((val) => {
      if (val == 'User not found') {
        this.store.dispatch(UserActions.createUser());
      }
    });
    this.store.select('user', 'isCreateUserSuccess').subscribe((val) => {
      if (val) {
        this.store.dispatch(UserActions.getUserById());
      }
    });
  }
}
