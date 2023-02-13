import { Body, Controller, Post, UseGuards, Get } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { GetUserId } from 'src/common/decorators/get-user.decorator';
import { NewChatDto } from '../dto/new-chat.dto';
import { ChatService } from '../services/chat.service';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('/create-room')
  @UseGuards(JwtAuthGuard)
  createNewChatRoom(@GetUserId() userId: number, @Body() data: NewChatDto) {
    return this.chatService.createRoom([userId, data.userId]);
  }

  @Get('/rooms')
  @UseGuards(JwtAuthGuard)
  findChatRooms(@GetUserId() userId: number) {
    return this.chatService.getRooms(userId);
  }
}
