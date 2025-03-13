import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import configuration from './utils/configuration';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from './domains/users/users.module';
import { AuthModule } from './domains/auth/auth.module';
import { VideosModule } from './domains/videos/videos.module';
import { VideoGateway } from './domains/videos/video.gateway';
import { PlaylistsModule } from './domains/playlists/playlists.module';
import { HistoryModule } from './domains/history/history.module';
import { CategoriesController } from './domains/categories/categories.controller';
import { CategoriesModule } from './domains/categories/categories.module';
import { CommentsModule } from './domains/comments/comments.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    JwtModule.register({
      global: true,
      secret: configuration().jwt_secret,
      signOptions: { expiresIn: '7200s' },
    }),
    UsersModule,
    AuthModule,
    VideosModule,
    PlaylistsModule,
    HistoryModule,
    CategoriesModule,
    CommentsModule,
  ],
  controllers: [AppController],
  providers: [AppService, VideoGateway],
})
export class AppModule {}
