import {
  Controller,
  Get,
  UseGuards,
  Query,
  DefaultValuePipe,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { GetUserId } from 'src/common/decorators/get-user.decorator';
import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/me')
  @UseGuards(JwtAuthGuard)
  getMyProfile(@GetUserId() userId: number) {
    return this.usersService.findOne(userId);
  }

  @Get('/search')
  @UseGuards(JwtAuthGuard)
  findUsers(@Query('like', new DefaultValuePipe('')) like: string) {
    return this.usersService.findAll(like);
  }
}
