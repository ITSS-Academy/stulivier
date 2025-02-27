import { Component, HostListener, OnInit } from '@angular/core';
  import { SharedModule } from '../../../shared/modules/shared.module';
  import { MaterialModule } from '../../../shared/modules/material.module';
  import { VideoModule } from '../../../shared/modules/video.module';

  @Component({
    selector: 'app-watch-later',
    standalone: true,
    imports: [SharedModule, MaterialModule, VideoModule],
    templateUrl: './watch-later.component.html',
    styleUrl: './watch-later.component.scss',
  })
  export class WatchLaterComponent implements OnInit {
    ngOnInit(): void {
      document.addEventListener('click', this.handleClickOutside.bind(this));
    }

    toggleOptions(): void {
      const optionsPanel = document.getElementById('options-panel');
      if (optionsPanel) {
        optionsPanel.style.display = optionsPanel.style.display === 'none' ? 'flex' : 'none';
      }
    }

    onBackgroundImageChange(event: Event): void {
      const input = event.target as HTMLInputElement;
      if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const bgElement = document.getElementById('bg');
          if (bgElement && e.target) {
            bgElement.style.backgroundImage = `url(${(e.target as FileReader).result})`;
          }
        };
        reader.readAsDataURL(input.files[0]);
      }
    }

    onColorChange(event: Event): void {
      const input = event.target as HTMLInputElement;
      const bgElement = document.getElementById('bg');
      if (bgElement) {
        bgElement.style.backgroundColor = input.value;
      }
    }

    changeBackgroundColor() {
      // Implement your logic here
    }

    handleClickOutside(event: MouseEvent): void {
      const optionsPanel = document.getElementById('options-panel');
      const centerButton = document.querySelector('.center-button');
      if (optionsPanel && centerButton && !optionsPanel.contains(event.target as Node) && !centerButton.contains(event.target as Node)) {
        optionsPanel.style.display = 'none';
      }
    }
  }
