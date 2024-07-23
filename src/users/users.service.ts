import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './users.entity';
import { CreateUserDto } from './dto/create-user.dto';

import { RolesService } from 'src/roles/roles.service';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private RoleRepository: RolesService,
  ) {}

  async createUser(dto: CreateUserDto) {
    const user = this.usersRepository.create(dto);
    const role = await this.RoleRepository.getRoleByValue('ADMIN');
    user.roles = [role];
    await this.usersRepository.save(user);
    return user;
  }

  async getAllUsers() {
    const users = await this.usersRepository.find({
      relations: {
        roles: true,
      },
    });
    return users;
  }

  async getUserById(id: number) {
    try {
      const user = await this.usersRepository.find({
        relations: {
          roles: true,
        },
        where: { id: id },
      });
      if (user.length === 0) {
        return null;
      }
      return user[0];
    } catch (err) {
      console.log('Error while get user by id', err);
      return null;
    }
  }

  async getUserByUsername(username: string) {
    try {
      const user = await this.usersRepository.find({
        relations: {
          roles: true,
        },
        where: { username },
      });
      if (user.length === 0) {
        return null;
      }
      return user[0];
    } catch (err) {
      console.log('Error while get user by username', err);
      return null;
    }
  }

  async addRole(dto: AddRoleDto) {
    const user = await this.getUserById(dto.userId);
    const role = await this.RoleRepository.getRoleByValue(dto.value);
    if (role && user) {
      user.roles.push(role);
      await this.usersRepository.save(user);
      return user;
    }
    throw new HttpException('User or role not found', 404);
  }

  async ban(dto: BanUserDto) {
    const user = this.getUserById(dto.userId);
    await this.usersRepository.update(dto.userId, {
      banned: true,
      banReason: dto.banReason,
    });
    return user;
  }
}
