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
import { MatDialog } from '@angular/material/dialog';
import { CreateVideoComponent } from '../../dialogs/create-video/create-video.component';

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
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  user$: Observable<UserModel>;
  readonly dialog = inject(MatDialog);

  @Output() menuClick = new EventEmitter<void>();

  constructor(private store: Store<{ auth: AuthState; user: UserState }>) {
    this.user$ = this.store.select('user', 'user');
  }

  onMenuClick(): void {
    this.menuClick.emit();
  }

  openCreateVideoDialog() {
    const dialogRef = this.dialog.open(CreateVideoComponent, {
      minWidth: '1000px',
    });
  }

  signInWithGoogle() {
    this.store.dispatch(AuthActions.signInWithGoogle());
  }

  signOut() {
    this.store.dispatch(AuthActions.signOut());
    this.store.dispatch(UserActions.clearState());
    this.store.dispatch(UserActions.clearState());
  }
}
