import { Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';
import { PrismaConfig } from './config/prisma.config';

@Module({
  imports: [
    PrismaModule.forRootAsync({
      isGlobal: true,
      useClass: PrismaConfig,
    }),
  ],
})
export class DatabaseModule {}
