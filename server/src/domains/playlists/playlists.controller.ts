import { PlaylistsService } from './playlists.service';
import {
  Body,
  Controller,
  Post,
  Request,
  Get,
  Delete,
  Put,
} from '@nestjs/common';
import {
  CreatePlaylistModel,
  UpdatePlaylistModel,
} from '../../models/playlist.model';
import { Public } from '../../utils/custom_decorators';

@Controller('playlists')
export class PlaylistsController {
  constructor(private playlistsService: PlaylistsService) {}

  @Post()
  async createPlaylist(@Body() createPlaylistModel: CreatePlaylistModel) {
    return await this.playlistsService.createPlaylist(createPlaylistModel);
  }

  @Public()
  @Get('all')
  async getAllPlaylists() {
    return await this.playlistsService.getAllPlaylists();
  }

  @Get('user')
  async getPlaylistByUserId(@Request() req: any) {
    const { userId } = req.query;
    return await this.playlistsService.getPlaylistByUserId(userId);
  }

  @Get()
  async getPlaylistById(@Request() req: any) {
    const { id } = req.query;
    return await this.playlistsService.getPlaylistById(id);
  }

  @Get('watch-later')
  async getWatchLaterPlaylistByUserId(@Request() req: any) {
    const { userId } = req.query;
    return await this.playlistsService.getWatchLaterPlaylistByUserId(userId);
  }

  @Post('upsert')
  async upsertPlaylist(@Request() req: any) {
    const { playlistId, videoId } = req.query;
    return await this.playlistsService.upsertPlaylist(playlistId, videoId);
  }

  @Post('watch-later')
  async upsertWatchLaterPlaylist(@Request() req: any) {
    const { userId, videoId } = req.query;
    return await this.playlistsService.upsertWatchLaterPlaylist(
      userId,
      videoId,
    );
  }

  @Delete('watch-later')
  async removeVideoInWatchLaterPlaylist(@Request() req: any) {
    const { userId, videoId } = req.query;
    return await this.playlistsService.removeVideoInWatchLaterPlaylist(
      userId,
      videoId,
    );
  }

  @Delete()
  async deletePlaylistById(@Request() req: any) {
    const { playlistId } = req.query;
    return await this.playlistsService.deletePlaylistById(playlistId);
  }

  @Put()
  async updatePlaylistById(
    @Request() req: any,
    @Body() body: UpdatePlaylistModel,
  ) {
    const { playlistId } = req.query;
    return await this.playlistsService.updatePlaylistById(playlistId, body);
  }
}
