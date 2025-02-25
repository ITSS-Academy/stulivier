import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/modules/shared.module';
import { MaterialModule } from '../../../shared/modules/material.module';
import { VideoModule } from '../../../shared/modules/video.module';
import {SubscriptionCardComponent} from '../../components/subscription-card/subscription-card.component';

@Component({
  selector: 'app-subscriptions',
  standalone: true,
  imports: [SharedModule, MaterialModule, VideoModule, SubscriptionCardComponent],
  templateUrl: './subscriptions.component.html',
  styleUrl: './subscriptions.component.scss',
})
export class SubscriptionsComponent {}
