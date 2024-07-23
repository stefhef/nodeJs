import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';

import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/users.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto);
    return this.generateToken(user);
  }
  async register(userDto: CreateUserDto) {
    const candidate = await this.usersService.getUserByUsername(
      userDto.username,
    );
    if (candidate) {
      throw new HttpException(
        'User with that username exist',
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashPassword = await bcrypt.hash(userDto.password, 10);
    const user = await this.usersService.createUser({
      ...userDto,
      password: hashPassword,
    });
    return this.generateToken(user);
  }

  private async generateToken(user: User) {
    const payload = { username: user.username, id: user.id, roles: user.roles };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async validateUser(userDto: CreateUserDto) {
    const user = await this.usersService.getUserByUsername(userDto.username);
    const passwordEqual = await bcrypt.compare(userDto.password, user.password);
    if (user && passwordEqual) {
      return user;
    }

    throw new UnauthorizedException({ message: 'Invalid credentials' });
  }
}
