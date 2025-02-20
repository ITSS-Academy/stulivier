import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../services/theme.service';
import { MaterialModule } from '../shared/modules/material.module';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { NgClass } from '@angular/common';

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
    private themeService: ThemeService,
    private router: Router,
  ) {}

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
          this.isHiddenSidebar = true;
          this.isSlideBarVisible = false;
        }
      }
    });
  }
}
