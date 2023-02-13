import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger, UseGuards } from '@nestjs/common';
import { ChatUserService } from '../services/chat-user.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { ChatService } from '../services/chat.service';

@WebSocketGateway({
  namespace: '/api/v1/chat-socket',
  transport: ['websocket', 'polling'],
  path: '/api/v1/chat-socket',
  cors: {
    origin: function (origin, fn) {
      return fn(null, origin);
    },
    credentials: true,
  },
})
export class ChatGateway implements OnGatewayConnection {
  @WebSocketServer() server: Server;

  constructor(
    private readonly chatUserService: ChatUserService,
    private readonly chatService: ChatService,
  ) {}

  @SubscribeMessage('message')
  async onMessage(
    @ConnectedSocket() socket: Socket,
    @MessageBody() data: { roomId: number; content: string },
  ) {
    const userId = this.chatUserService.getUserFromSocket(socket);
    const message = await this.chatService.createMessage(
      data.roomId,
      data.content,
      userId,
    );
    this.server.to('room-' + userId).emit('message-response', message);
    const members = await this.chatService.getChatMembers(data.roomId, userId);
    for (let member of members) {
      this.server.to('room-' + member.userId).emit('message', message);
    }
  }

  @UseGuards(JwtAuthGuard)
  handleConnection(socket: Socket) {
    const userId = this.chatUserService.getUserFromSocket(socket);
    socket.join('room-' + userId);
  }
}
