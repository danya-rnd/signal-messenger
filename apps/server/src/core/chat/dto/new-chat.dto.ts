import { IsNotEmpty, IsNumber } from 'class-validator';

export class NewChatDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;
}
