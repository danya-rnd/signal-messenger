import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class ChatService {
  constructor(private readonly prisma: PrismaService) {}

  getRooms(userId: number) {
    return this.prisma.chatRoom.findMany({
      where: {
        chatRoomMembers: {
          some: {
            user: {
              id: userId,
            },
          },
        },
      },
      include: {
        messages: true,
        chatRoomMembers: {
          select: {
            user: {
              select: {
                id: true,
                username: true,
                avatar: true,
              },
            },
          },
        },
      },
    });
  }

  createRoom(users: number[]) {
    return this.prisma.chatRoom.create({
      data: {
        chatRoomMembers: {
          createMany: {
            data: [
              ...users.map((n) => {
                return {
                  userId: n,
                };
              }),
            ],
          },
        },
      },
    });
  }

  getChatMembers(roomId: number, userId: number) {
    return this.prisma.chatRoomMembers.findMany({
      where: {
        roomId,
        NOT: {
          userId: userId,
        },
      },
    });
  }

  createMessage(roomId: number, content: string, userId: number) {
    return this.prisma.chatMessage.create({
      data: {
        roomId,
        content,
        userId,
      },
    });
  }
}
