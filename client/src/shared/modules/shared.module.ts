import { NgModule } from '@angular/core';
import {
  AsyncPipe,
  CommonModule,
  DatePipe,
  JsonPipe,
  NgClass,
  NgStyle,
} from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    AsyncPipe,
    DatePipe,
    JsonPipe,
    NgStyle,
    NgClass,
  ],
  exports: [
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    AsyncPipe,
    DatePipe,
    JsonPipe,
    NgStyle,
    NgClass,
  ],
})
export class SharedModule {}
