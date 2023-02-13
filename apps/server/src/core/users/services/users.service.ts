import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(like: string) {
    return this.prisma.user.findMany({
      where: {
        username: {
          contains: like,
        },
      },
      select: {
        id: true,
        avatar: true,
        username: true,
      },
      take: 10,
    });
  }

  async findOne(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        avatar: true,
        username: true,
      },
    });
  }
}
