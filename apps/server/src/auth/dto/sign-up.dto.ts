import {
  IsOptional,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';
import { IsFile, MaxFileSize, HasMimeType, StoredFile } from 'nestjs-form-data';

export class SignUpDto {
  @IsString()
  @MaxLength(20)
  @MinLength(3)
  username: string;

  @IsString()
  @MinLength(8)
  @IsStrongPassword()
  password: string;

  @IsOptional()
  @IsFile()
  @MaxFileSize(1e6)
  @HasMimeType(['image/jpeg', 'image/png'])
  avatar: StoredFile;
}
