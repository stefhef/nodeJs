import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';

import { User } from 'src/users/users.entity';

@Entity()
export class Role {
  @ApiProperty({ example: '1', description: 'Unique identificator' })
  @PrimaryGeneratedColumn()
  id!: number;

  @ApiProperty({ example: 'Admin', description: 'Role ' })
  @Column({ type: 'varchar', length: 50, unique: true })
  value!: string;

  @ApiProperty({ example: 'Administrator', description: 'Role description' })
  @Column({ type: 'varchar', length: 50 })
  description!: string;

  @ManyToMany(() => User, (user) => user.roles)
  users: User[];
}
