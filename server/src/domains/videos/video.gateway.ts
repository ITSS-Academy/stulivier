import {
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class VideoGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;
  clientId: string;

  handleConnection(client: Socket) {
    this.clientId = client.id;
  }

  handleDisconnect(client: Socket) {}

  sendUploadProgress(progress: number) {
    this.server.to(this.clientId).emit('uploadProgress', progress);
  }
}
