import { Component, Input } from '@angular/core';
import { SharedModule } from '../../../shared/modules/shared.module';
import { MaterialModule } from '../../../shared/modules/material.module';
import { VideoModule } from '../../../shared/modules/video.module';
import { VideoCardVerticalComponent } from '../../components/video-card-vertical/video-card-vertical.component';
import { VideoModel } from '../../../models/video.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    SharedModule,
    MaterialModule,
    VideoModule,
    VideoCardVerticalComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  @Input() video!: VideoModel;
  videos: VideoModel[] = [
    {
      video_url:
        'https://i.ytimg.com/vi/1iMOtDC8ROk/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLCF7Ubnq0Ev1FMFiISJ2797xZH79A',
      title: 'NHÀ CÒN THƯƠNG EM MÀ - Nhà Gia Tiên OST (MV Lyric)',
      avatar_url:
        'https://yt3.ggpht.com/EEx-Mr8UaTVlwRbtrb1iuJquUxF294NNREi_XbvQgVeQqXB872eVxbwfEw3p4ZaDwpitD8oC=s88-c-k-c0x00ffffff-no-rj',
      username: 'Huỳnh Lập Official',
      views: 384256,
      created_at: '1 hour ago ',
      likes: 0,
      dislikes: 0,
      id: '',
      user_id: '',
      reaction_type: '',
      resume_position: 0,
      category_id: '',
      description: '',
      thumbnail_url: '',
    },
    {
      video_url:
        'https://i.ytimg.com/vi/1iMOtDC8ROk/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLCF7Ubnq0Ev1FMFiISJ2797xZH79A',
      title:
        'NHÀ CÒN THƯƠNG EM MÀ - Nhà Gia Tiên OST (MV Lyric) saify dibfsaidf dfbsuidfh',
      avatar_url:
        'https://yt3.ggpht.com/EEx-Mr8UaTVlwRbtrb1iuJquUxF294NNREi_XbvQgVeQqXB872eVxbwfEw3p4ZaDwpitD8oC=s88-c-k-c0x00ffffff-no-rj',
      username: 'Huỳnh Lập Official',
      views: 384256,
      created_at: '1 hour ago ',
      likes: 0,
      dislikes: 0,
      id: '',
      user_id: '',
      reaction_type: '',
      resume_position: 0,
      category_id: '',
      description: '',
      thumbnail_url: '',
    },
    {
      video_url:
        'https://i.ytimg.com/vi/1iMOtDC8ROk/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLCF7Ubnq0Ev1FMFiISJ2797xZH79A',
      title:
        'NHÀ CÒN THƯƠNG EM MÀ - Nhà Gia Tiên OST (MV Lyric) saify dibfsaidf dfbsuidfh',
      avatar_url:
        'https://yt3.ggpht.com/EEx-Mr8UaTVlwRbtrb1iuJquUxF294NNREi_XbvQgVeQqXB872eVxbwfEw3p4ZaDwpitD8oC=s88-c-k-c0x00ffffff-no-rj',
      username: 'Huỳnh Lập Official',
      views: 384256,
      created_at: '1 hour ago ',
      likes: 0,
      dislikes: 0,
      id: '',
      user_id: '',
      reaction_type: '',
      resume_position: 0,
      category_id: '',
      description: '',
      thumbnail_url: '',
    },
    {
      video_url:
        'https://i.ytimg.com/vi/1iMOtDC8ROk/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLCF7Ubnq0Ev1FMFiISJ2797xZH79A',
      title:
        'NHÀ CÒN THƯƠNG EM MÀ - Nhà Gia Tiên OST (MV Lyric) saify dibfsaidf dfbsuidfh',
      avatar_url:
        'https://yt3.ggpht.com/EEx-Mr8UaTVlwRbtrb1iuJquUxF294NNREi_XbvQgVeQqXB872eVxbwfEw3p4ZaDwpitD8oC=s88-c-k-c0x00ffffff-no-rj',
      username: 'Huỳnh Lập Official',
      views: 384256,
      created_at: '1 hour ago ',
      likes: 0,
      dislikes: 0,
      id: '',
      user_id: '',
      reaction_type: '',
      resume_position: 0,
      category_id: '',
      description: '',
      thumbnail_url: '',
    },
    {
      video_url:
        'https://i.ytimg.com/vi/1iMOtDC8ROk/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLCF7Ubnq0Ev1FMFiISJ2797xZH79A',
      title:
        'NHÀ CÒN THƯƠNG EM MÀ - Nhà Gia Tiên OST (MV Lyric) saify dibfsaidf dfbsuidfh',
      avatar_url:
        'https://yt3.ggpht.com/EEx-Mr8UaTVlwRbtrb1iuJquUxF294NNREi_XbvQgVeQqXB872eVxbwfEw3p4ZaDwpitD8oC=s88-c-k-c0x00ffffff-no-rj',
      username: 'Huỳnh Lập Official',
      views: 384256,
      created_at: '1 hour ago ',
      likes: 0,
      dislikes: 0,
      id: '',
      user_id: '',
      reaction_type: '',
      resume_position: 0,
      category_id: '',
      description: '',
      thumbnail_url: '',
    },
    {
      video_url:
        'https://i.ytimg.com/vi/1iMOtDC8ROk/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLCF7Ubnq0Ev1FMFiISJ2797xZH79A',
      title:
        'NHÀ CÒN THƯƠNG EM MÀ - Nhà Gia Tiên OST (MV Lyric) saify dibfsaidf dfbsuidfh',
      avatar_url:
        'https://yt3.ggpht.com/EEx-Mr8UaTVlwRbtrb1iuJquUxF294NNREi_XbvQgVeQqXB872eVxbwfEw3p4ZaDwpitD8oC=s88-c-k-c0x00ffffff-no-rj',
      username: 'Huỳnh Lập Official',
      views: 384256,
      created_at: '1 hour ago ',
      likes: 0,
      dislikes: 0,
      id: '',
      user_id: '',
      reaction_type: '',
      resume_position: 0,
      category_id: '',
      description: '',
      thumbnail_url: '',
    },
    {
      video_url:
        'https://i.ytimg.com/vi/1iMOtDC8ROk/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLCF7Ubnq0Ev1FMFiISJ2797xZH79A',
      title:
        'NHÀ CÒN THƯƠNG EM MÀ - Nhà Gia Tiên OST (MV Lyric) saify dibfsaidf dfbsuidfh',
      avatar_url:
        'https://yt3.ggpht.com/EEx-Mr8UaTVlwRbtrb1iuJquUxF294NNREi_XbvQgVeQqXB872eVxbwfEw3p4ZaDwpitD8oC=s88-c-k-c0x00ffffff-no-rj',
      username: 'Huỳnh Lập Official',
      views: 384256,
      created_at: '1 hour ago ',
      likes: 0,
      dislikes: 0,
      id: '',
      user_id: '',
      reaction_type: '',
      resume_position: 0,
      category_id: '',
      description: '',
      thumbnail_url: '',
    },
    {
      video_url:
        'https://i.ytimg.com/vi/1iMOtDC8ROk/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLCF7Ubnq0Ev1FMFiISJ2797xZH79A',
      title:
        'NHÀ CÒN THƯƠNG EM MÀ - Nhà Gia Tiên OST (MV Lyric) saify dibfsaidf dfbsuidfh',
      avatar_url:
        'https://yt3.ggpht.com/EEx-Mr8UaTVlwRbtrb1iuJquUxF294NNREi_XbvQgVeQqXB872eVxbwfEw3p4ZaDwpitD8oC=s88-c-k-c0x00ffffff-no-rj',
      username: 'Huỳnh Lập Official',
      views: 384256,
      created_at: '1 hour ago ',
      likes: 0,
      dislikes: 0,
      id: '',
      user_id: '',
      reaction_type: '',
      resume_position: 0,
      category_id: '',
      description: '',
      thumbnail_url: '',
    },
    {
      video_url:
        'https://i.ytimg.com/vi/1iMOtDC8ROk/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLCF7Ubnq0Ev1FMFiISJ2797xZH79A',
      title:
        'NHÀ CÒN THƯƠNG EM MÀ - Nhà Gia Tiên OST (MV Lyric) saify dibfsaidf dfbsuidfh',
      avatar_url:
        'https://yt3.ggpht.com/EEx-Mr8UaTVlwRbtrb1iuJquUxF294NNREi_XbvQgVeQqXB872eVxbwfEw3p4ZaDwpitD8oC=s88-c-k-c0x00ffffff-no-rj',
      username: 'Huỳnh Lập Official',
      views: 384256,
      created_at: '1 hour ago ',
      likes: 0,
      dislikes: 0,
      id: '',
      user_id: '',
      reaction_type: '',
      resume_position: 0,
      category_id: '',
      description: '',
      thumbnail_url: '',
    },
    {
      video_url:
        'https://i.ytimg.com/vi/1iMOtDC8ROk/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLCF7Ubnq0Ev1FMFiISJ2797xZH79A',
      title:
        'NHÀ CÒN THƯƠNG EM MÀ - Nhà Gia Tiên OST (MV Lyric) saify dibfsaidf dfbsuidfh',
      avatar_url:
        'https://yt3.ggpht.com/EEx-Mr8UaTVlwRbtrb1iuJquUxF294NNREi_XbvQgVeQqXB872eVxbwfEw3p4ZaDwpitD8oC=s88-c-k-c0x00ffffff-no-rj',
      username: 'Huỳnh Lập Official',
      views: 384256,
      created_at: '1 hour ago ',
      likes: 0,
      dislikes: 0,
      id: '',
      user_id: '',
      reaction_type: '',
      resume_position: 0,
      category_id: '',
      description: '',
      thumbnail_url: '',
    },
    {
      video_url:
        'https://i.ytimg.com/vi/1iMOtDC8ROk/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLCF7Ubnq0Ev1FMFiISJ2797xZH79A',
      title:
        'NHÀ CÒN THƯƠNG EM MÀ - Nhà Gia Tiên OST (MV Lyric) saify dibfsaidf dfbsuidfh',
      avatar_url:
        'https://yt3.ggpht.com/EEx-Mr8UaTVlwRbtrb1iuJquUxF294NNREi_XbvQgVeQqXB872eVxbwfEw3p4ZaDwpitD8oC=s88-c-k-c0x00ffffff-no-rj',
      username: 'Huỳnh Lập Official',
      views: 384256,
      created_at: '1 hour ago ',
      likes: 0,
      dislikes: 0,
      id: '',
      user_id: '',
      reaction_type: '',
      resume_position: 0,
      category_id: '',
      description: '',
      thumbnail_url: '',
    },
    {
      video_url:
        'https://i.ytimg.com/vi/1iMOtDC8ROk/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLCF7Ubnq0Ev1FMFiISJ2797xZH79A',
      title:
        'NHÀ CÒN THƯƠNG EM MÀ - Nhà Gia Tiên OST (MV Lyric) saify dibfsaidf dfbsuidfh',
      avatar_url:
        'https://yt3.ggpht.com/EEx-Mr8UaTVlwRbtrb1iuJquUxF294NNREi_XbvQgVeQqXB872eVxbwfEw3p4ZaDwpitD8oC=s88-c-k-c0x00ffffff-no-rj',
      username: 'Huỳnh Lập Official',
      views: 384256,
      created_at: '1 hour ago ',
      likes: 0,
      dislikes: 0,
      id: '',
      user_id: '',
      reaction_type: '',
      resume_position: 0,
      category_id: '',
      description: '',
      thumbnail_url: '',
    },
    {
      video_url:
        'https://i.ytimg.com/vi/1iMOtDC8ROk/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLCF7Ubnq0Ev1FMFiISJ2797xZH79A',
      title:
        'NHÀ CÒN THƯƠNG EM MÀ - Nhà Gia Tiên OST (MV Lyric) saify dibfsaidf dfbsuidfh',
      avatar_url:
        'https://yt3.ggpht.com/EEx-Mr8UaTVlwRbtrb1iuJquUxF294NNREi_XbvQgVeQqXB872eVxbwfEw3p4ZaDwpitD8oC=s88-c-k-c0x00ffffff-no-rj',
      username: 'Huỳnh Lập Official',
      views: 384256,
      created_at: '1 hour ago ',
      likes: 0,
      dislikes: 0,
      id: '',
      user_id: '',
      reaction_type: '',
      resume_position: 0,
      category_id: '',
      description: '',
      thumbnail_url: '',
    },
    {
      video_url:
        'https://i.ytimg.com/vi/1iMOtDC8ROk/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLCF7Ubnq0Ev1FMFiISJ2797xZH79A',
      title:
        'NHÀ CÒN THƯƠNG EM MÀ - Nhà Gia Tiên OST (MV Lyric) saify dibfsaidf dfbsuidfh',
      avatar_url:
        'https://yt3.ggpht.com/EEx-Mr8UaTVlwRbtrb1iuJquUxF294NNREi_XbvQgVeQqXB872eVxbwfEw3p4ZaDwpitD8oC=s88-c-k-c0x00ffffff-no-rj',
      username: 'Huỳnh Lập Official',
      views: 384256,
      created_at: '1 hour ago ',
      likes: 0,
      dislikes: 0,
      id: '',
      user_id: '',
      reaction_type: '',
      resume_position: 0,
      category_id: '',
      description: '',
      thumbnail_url: '',
    },
    {
      video_url:
        'https://i.ytimg.com/vi/1iMOtDC8ROk/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLCF7Ubnq0Ev1FMFiISJ2797xZH79A',
      title:
        'NHÀ CÒN THƯƠNG EM MÀ - Nhà Gia Tiên OST (MV Lyric) saify dibfsaidf dfbsuidfh',
      avatar_url:
        'https://yt3.ggpht.com/EEx-Mr8UaTVlwRbtrb1iuJquUxF294NNREi_XbvQgVeQqXB872eVxbwfEw3p4ZaDwpitD8oC=s88-c-k-c0x00ffffff-no-rj',
      username: 'Huỳnh Lập Official',
      views: 384256,
      created_at: '1 hour ago ',
      likes: 0,
      dislikes: 0,
      id: '',
      user_id: '',
      reaction_type: '',
      resume_position: 0,
      category_id: '',
      description: '',
      thumbnail_url: '',
    },
    {
      video_url:
        'https://i.ytimg.com/vi/1iMOtDC8ROk/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLCF7Ubnq0Ev1FMFiISJ2797xZH79A',
      title:
        'NHÀ CÒN THƯƠNG EM MÀ - Nhà Gia Tiên OST (MV Lyric) saify dibfsaidf dfbsuidfh',
      avatar_url:
        'https://yt3.ggpht.com/EEx-Mr8UaTVlwRbtrb1iuJquUxF294NNREi_XbvQgVeQqXB872eVxbwfEw3p4ZaDwpitD8oC=s88-c-k-c0x00ffffff-no-rj',
      username: 'Huỳnh Lập Official',
      views: 384256,
      created_at: '1 hour ago ',
      likes: 0,
      dislikes: 0,
      id: '',
      user_id: '',
      reaction_type: '',
      resume_position: 0,
      category_id: '',
      description: '',
      thumbnail_url: '',
    },
    {
      video_url:
        'https://i.ytimg.com/vi/1iMOtDC8ROk/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLCF7Ubnq0Ev1FMFiISJ2797xZH79A',
      title:
        'NHÀ CÒN THƯƠNG EM MÀ - Nhà Gia Tiên OST (MV Lyric) saify dibfsaidf dfbsuidfh',
      avatar_url:
        'https://yt3.ggpht.com/EEx-Mr8UaTVlwRbtrb1iuJquUxF294NNREi_XbvQgVeQqXB872eVxbwfEw3p4ZaDwpitD8oC=s88-c-k-c0x00ffffff-no-rj',
      username: 'Huỳnh Lập Official',
      views: 384256,
      created_at: '1 hour ago ',
      likes: 0,
      dislikes: 0,
      id: '',
      user_id: '',
      reaction_type: '',
      resume_position: 0,
      category_id: '',
      description: '',
      thumbnail_url: '',
    },
    {
      video_url:
        'https://i.ytimg.com/vi/1iMOtDC8ROk/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLCF7Ubnq0Ev1FMFiISJ2797xZH79A',
      title:
        'NHÀ CÒN THƯƠNG EM MÀ - Nhà Gia Tiên OST (MV Lyric) saify dibfsaidf dfbsuidfh',
      avatar_url:
        'https://yt3.ggpht.com/EEx-Mr8UaTVlwRbtrb1iuJquUxF294NNREi_XbvQgVeQqXB872eVxbwfEw3p4ZaDwpitD8oC=s88-c-k-c0x00ffffff-no-rj',
      username: 'Huỳnh Lập Official',
      views: 384256,
      created_at: '1 hour ago ',
      likes: 0,
      dislikes: 0,
      id: '',
      user_id: '',
      reaction_type: '',
      resume_position: 0,
      category_id: '',
      description: '',
      thumbnail_url: '',
    },
    {
      video_url:
        'https://i.ytimg.com/vi/1iMOtDC8ROk/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLCF7Ubnq0Ev1FMFiISJ2797xZH79A',
      title:
        'NHÀ CÒN THƯƠNG EM MÀ - Nhà Gia Tiên OST (MV Lyric) saify dibfsaidf dfbsuidfh',
      avatar_url:
        'https://yt3.ggpht.com/EEx-Mr8UaTVlwRbtrb1iuJquUxF294NNREi_XbvQgVeQqXB872eVxbwfEw3p4ZaDwpitD8oC=s88-c-k-c0x00ffffff-no-rj',
      username: 'Huỳnh Lập Official',
      views: 384256,
      created_at: '1 hour ago ',
      likes: 0,
      dislikes: 0,
      id: '',
      user_id: '',
      reaction_type: '',
      resume_position: 0,
      category_id: '',
      description: '',
      thumbnail_url: '',
    },
    {
      video_url:
        'https://i.ytimg.com/vi/1iMOtDC8ROk/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLCF7Ubnq0Ev1FMFiISJ2797xZH79A',
      title:
        'NHÀ CÒN THƯƠNG EM MÀ - Nhà Gia Tiên OST (MV Lyric) saify dibfsaidf dfbsuidfh',
      avatar_url:
        'https://yt3.ggpht.com/EEx-Mr8UaTVlwRbtrb1iuJquUxF294NNREi_XbvQgVeQqXB872eVxbwfEw3p4ZaDwpitD8oC=s88-c-k-c0x00ffffff-no-rj',
      username: 'Huỳnh Lập Official',
      views: 384256,
      created_at: '1 hour ago ',
      likes: 0,
      dislikes: 0,
      id: '',
      user_id: '',
      reaction_type: '',
      resume_position: 0,
      category_id: '',
      description: '',
      thumbnail_url: '',
    },
  ];
}
