import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SharedModule } from '../../../shared/modules/shared.module';
import { MaterialModule } from '../../../shared/modules/material.module';
import { VideoModule } from '../../../shared/modules/video.module';

@Component({
  selector: 'app-liked-videos',
  standalone: true,
  imports: [SharedModule, MaterialModule, VideoModule],
  templateUrl: './liked-videos.component.html',
  styleUrl: './liked-videos.component.scss',
})
export class LikedVideosComponent implements OnInit {
  @ViewChild('coverInput') coverInput!: ElementRef<HTMLInputElement>;
  coverImage: string | ArrayBuffer | null =
    'https://hybsmigdaummopabuqki.supabase.co/storage/v1/object/public/cover_img//nasa_earth_grid.jpg';

  constructor() {}

  ngOnInit(): void {}

  triggerCoverInput(): void {
    this.coverInput.nativeElement.click();
  }

  onCoverSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e) => (this.coverImage = reader.result);
      reader.readAsDataURL(file);
    }
  }

  playAll(event: Event): void {
    event.stopPropagation();
    // Add your play all logic here
  }

  shuffle(event: Event): void {
    event.stopPropagation();
    // Add your shuffle logic here
  }
}
