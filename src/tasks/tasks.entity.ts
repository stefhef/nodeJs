import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Task {
  @ApiProperty({ example: '1', description: 'Unique identificator' })
  @PrimaryGeneratedColumn()
  id!: number;

  @ApiProperty({ example: 'Learn NestJS', description: 'Task text' })
  @Column({ type: 'varchar', length: 50 })
  text!: string;

  @ApiProperty({ example: '123', description: 'User id' })
  @Column({ type: 'varchar', length: 50 })
  userId!: string;
}
