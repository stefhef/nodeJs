import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/roles/roles.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity()
export class User {
  @ApiProperty({ example: '1', description: 'Unique identificator' })
  @PrimaryGeneratedColumn()
  id!: number;

  @ApiProperty({
    example: 'Stepan',
    description: 'Username for user',
    nullable: true,
  })
  @Column({ type: 'varchar', length: 50 })
  username!: string;

  @ApiProperty({ example: '123456789', description: 'User password' })
  @Column({ type: 'varchar', length: 200 })
  password!: string;

  @ApiProperty({
    example: 'true',
    description: 'Is user banned?',
    default: false,
  })
  @Column({ type: 'bool', default: false })
  banned!: boolean;

  @ApiProperty({ example: 'Because he', description: 'Why iser is banned' })
  @Column({ type: 'varchar', length: 50, nullable: true })
  banReason!: string;

  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable()
  roles: Role[];
}
