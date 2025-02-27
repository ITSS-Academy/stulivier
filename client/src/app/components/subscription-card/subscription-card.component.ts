import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-subscription-card',
  standalone: true,
  imports: [MatButton],
  templateUrl: './subscription-card.component.html',
  styleUrl: './subscription-card.component.scss',
})
export class SubscriptionCardComponent {
  subscriptions: Subscription[] = [
    {
      name: 'QuocDuy',
      subscribers: 1.1,
      avatar:
        'https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/474094aUF/anh-dep-doremon_033145831.png',
    },
    {
      name: 'QuangHuy',
      subscribers: 1.4,
      avatar: 'https://via.placeholder.com/50?text=H',
    },
    {
      name: 'GiaBao',
      subscribers: 1.6,
      avatar: 'https://via.placeholder.com/50?text=G',
    },
    {
      name: 'HoangPhi',
      subscribers: 1.7,
      avatar: 'https://via.placeholder.com/50?text=P',
    },
    {
      name: 'Milk',
      subscribers: 2.0,
      avatar: 'https://via.placeholder.com/50?text=M',
    },
    {
      name: 'TuHao',
      subscribers: 3.5,
      avatar: 'https://via.placeholder.com/50?text=T',
    },
    {
      name: 'Quan',
      subscribers: 2.5,
      avatar: 'https://via.placeholder.com/50?text=Q',
    },
    {
      name: 'FishKho',
      subscribers: 3.3,
      avatar: 'https://via.placeholder.com/50?text=F',
    },
    {
      name: 'TrunThen',
      subscribers: 5.6,
      avatar: 'https://via.placeholder.com/50?text=T',
    },
    {
      name: 'TrunHoe',
      subscribers: 1.8,
      avatar: 'https://via.placeholder.com/50?text=H',
    },
    {
      name: 'MinQuy',
      subscribers: 1.9,
      avatar: 'https://via.placeholder.com/50?text=M',
    },
    {
      name: 'Quan',
      subscribers: 13.0,
      avatar: 'https://via.placeholder.com/50?text=Q',
    },
  ];
}

export interface Subscription {
  name: string;
  subscribers: number;
  avatar: string;
}
