import { Component, EventEmitter, Output } from '@angular/core';
import { MaterialModule } from '../../../shared/modules/material.module';
import { SharedModule } from '../../../shared/modules/shared.module';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MaterialModule, SharedModule, MatInputModule, MatFormFieldModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @Output() menuClick = new EventEmitter<void>();

  onMenuClick(): void {
    this.menuClick.emit();
  }

}
