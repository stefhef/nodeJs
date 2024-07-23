import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'stepan', description: 'username' })
  @IsString({ message: 'Must be string' })
  readonly username: string;

  @ApiProperty({ example: '12345678', description: 'password' })
  @IsString({ message: 'Must be string' })
  @Length(8, 16, { message: 'Must be 8-16 characters' })
  readonly password: string;
}
