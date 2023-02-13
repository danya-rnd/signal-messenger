import { Injectable } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { parse } from 'cookie';
import { Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class ChatUserService {
  constructor(private readonly jwtService: JwtService) {}

  getUserFromSocket(socket: Socket): number {
    const cookie = socket.handshake.headers.cookie;
    const { access_token } = parse(cookie);
    const payload = this.jwtService.verify(access_token, {
      secret: process.env.SECRET,
    });
    if (!payload.id) {
      throw new WsException('Неверные данные');
    }
    return payload.id;
  }
}
