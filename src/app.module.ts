import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { TasksModule } from './tasks/tasks.module';
import { Task } from './tasks/tasks.entity';

import { RolesModule } from './roles/roles.module';
import { Role } from './roles/roles.entity';

import { UsersModule } from './users/users.module';
import { User } from './users/users.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [Task, Role, User],
      synchronize: true,
    }),
    TasksModule,
    RolesModule,
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
