import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  public isDarkMode: boolean = false;

  constructor() {
    this.loadTheme();
  }

  get darkModeEnabled() {
    return this.isDarkMode;
  }

  public toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    this.applyTheme();
  }

  applyTheme() {
    if (this.isDarkMode) {
      document.body.classList.add('dark-theme');
      document.body.classList.remove('light-theme');
    } else {
      document.body.classList.add('light-theme');
      document.body.classList.remove('dark-theme');
    }

    localStorage.setItem('dark-mode', this.isDarkMode ? 'true' : 'false');
  }

  loadTheme() {
    const savedTheme = localStorage.getItem('dark-mode');
    this.isDarkMode = savedTheme === 'true';
    this.applyTheme();
  }
}
