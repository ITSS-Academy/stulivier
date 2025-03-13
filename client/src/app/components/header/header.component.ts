import { Component, EventEmitter, inject, Output } from '@angular/core';
import { MaterialModule } from '../../../shared/modules/material.module';
import { SharedModule } from '../../../shared/modules/shared.module';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { UserModel } from '../../../models/user.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AuthState } from '../../../ngrxs/auth/auth.state';
import { UserState } from '../../../ngrxs/user/user.state';
import * as AuthActions from '../../../ngrxs/auth/auth.actions';
import * as UserActions from '../../../ngrxs/user/user.actions';
import * as SidebarActions from '../../../ngrxs/sidebar/sidebar.actions';
import * as VideoActions from '../../../ngrxs/video/video.actions';
import { MatDialog } from '@angular/material/dialog';
import { CreateVideoDialogComponent } from '../../dialogs/create-video-dialog/create-video-dialog.component';
import { SidebarState } from '../../../ngrxs/sidebar/sidebar.state';
import { ThemeService } from '../../../services/theme.service';
import { Router } from '@angular/router';
import { NgxSkeletonLoaderComponent } from 'ngx-skeleton-loader';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MaterialModule,
    SharedModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatIconModule,
    NgxSkeletonLoaderComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  user$: Observable<UserModel>;
  isGettingUser$: Observable<boolean>;
  isInputFocused: boolean = false;
  readonly dialog = inject(MatDialog);
  searchText: string = '';
  isCheckLogin$!: Observable<boolean>;

  @Output() menuClick = new EventEmitter<void>();

  constructor(
    private store: Store<{
      auth: AuthState;
      user: UserState;
      sidebar: SidebarState;
    }>,
    public themeService: ThemeService,
    private router: Router,
  ) {
    this.user$ = this.store.select('user', 'user');
    this.isGettingUser$ = this.store.select('user', 'isGettingUser');
    this.isCheckLogin$ = this.store.select('auth', 'isCheckLoggedIn');
  }

  onMenuClick(): void {
    this.store.dispatch(SidebarActions.toggleSidebar());
    this.menuClick.emit();
  }

  openCreateVideoDialog() {
    const dialogRef = this.dialog.open(CreateVideoDialogComponent, {
      minWidth: '1000px',
      disableClose: true,
    });
  }

  signInWithGoogle() {
    this.store.dispatch(AuthActions.signInWithGoogle());
  }

  onLogoClick() {
    this.router.navigate(['/']);
  }

  clearSearch() {
    this.searchText = '';
  }

  onFocus() {
    this.isInputFocused = true;
  }

  onBlur() {
    this.isInputFocused = false;
  }

  search() {
    if (this.searchText === '') {
      return;
    }
    // trim search text
    this.searchText = this.searchText.trim();
    this.store.dispatch(
      VideoActions.searchVideos({ searchQuery: this.searchText }),
    );
    this.router.navigate(['/results'], {
      queryParams: { search_query: this.searchText },
    });
  }

  onImgError(event: any) {
    event.target.src = 'assets/images/default-avatar.jpg';
  }

  signOut() {
    this.store.dispatch(AuthActions.signOut());
    this.store.dispatch(UserActions.clearState());
  }
}
