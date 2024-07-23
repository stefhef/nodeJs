import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({ example: 'Learn NestJS', description: 'Task text' })
  readonly text: string;
  @ApiProperty({ example: 'user', description: 'Username' })
  readonly user: string;
}
