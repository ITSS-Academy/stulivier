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
      avatar: 'https://avatar.iran.liara.run/public/19',
    },
    {
      name: 'QuangHuy',
      subscribers: 1.4,
      avatar: 'https://avatar.iran.liara.run/public/25',
    },
    {
      name: 'GiaBao',
      subscribers: 1.6,
      avatar: 'https://avatar.iran.liara.run/public/2 ',
    },
    {
      name: 'HoangPhi',
      subscribers: 1.7,
      avatar: 'https://avatar.iran.liara.run/public/15',
    },
    {
      name: 'Milk',
      subscribers: 2.0,
      avatar: 'https://avatar.iran.liara.run/public/4',
    },
    {
      name: 'TuHao',
      subscribers: 3.5,
      avatar: 'https://avatar.iran.liara.run/public/86',
    },
    {
      name: 'Quan',
      subscribers: 2.5,
      avatar: 'https://avatar.iran.liara.run/public/84',
    },
    {
      name: 'FishKho',
      subscribers: 3.3,
      avatar: 'https://avatar.iran.liara.run/public/19',
    },
    {
      name: 'TrunThen',
      subscribers: 5.6,
      avatar: 'https://avatar.iran.liara.run/public/26',
    },
    {
      name: 'TrunHoe',
      subscribers: 1.8,
      avatar: 'https://avatar.iran.liara.run/public/34',
    },
    {
      name: 'MinQuy',
      subscribers: 1.9,
      avatar: 'https://avatar.iran.liara.run/public/6',
    },
    {
      name: 'Quan',
      subscribers: 13.0,
      avatar: 'https://avatar.iran.liara.run/public/9',
    },
    {
      name: 'Quan',
      subscribers: 13.0,
      avatar: 'https://avatar.iran.liara.run/public/16',
    },
    {
      name: 'Quan',
      subscribers: 13.0,
      avatar: 'https://avatar.iran.liara.run/public/38',
    },
    {
      name: 'Quan',
      subscribers: 13.0,
      avatar: 'https://avatar.iran.liara.run/public/33',
    },
    {
      name: 'Quan',
      subscribers: 13.0,
      avatar: 'https://avatar.iran.liara.run/public/27',
    },
    {
      name: 'Quan',
      subscribers: 13.0,
      avatar: 'https://avatar.iran.liara.run/public/39',
    },
    {
      name: 'Quan',
      subscribers: 13.0,
      avatar: 'https://avatar.iran.liara.run/public/7',
    },
    {
      name: 'Quan',
      subscribers: 13.0,
      avatar: 'https://avatar.iran.liara.run/public/31',
    },
    {
      name: 'Quan',
      subscribers: 13.0,
      avatar: 'https://avatar.iran.liara.run/public/32',
    },
    {
      name: 'Quan',
      subscribers: 13.0,
      avatar: 'https://avatar.iran.liara.run/public/11',
    },
    {
      name: 'Quan',
      subscribers: 13.0,
      avatar: 'https://avatar.iran.liara.run/public/13',
    },
    {
      name: 'Quan',
      subscribers: 13.0,
      avatar: 'https://avatar.iran.liara.run/public/28',
    },
  ];
}

export interface Subscription {
  name: string;
  subscribers: number;
  avatar: string;
}
