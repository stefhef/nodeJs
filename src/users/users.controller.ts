import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({
    status: 200,
    type: User,
    description: 'The user has been successfully created.',
  })
  @Post()
  createUser(@Body() userDto: CreateUserDto) {
    return this.usersService.createUser(userDto);
  }

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    type: [User],
  })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Get('/:id')
  getUserById(id: number) {
    console.log(id);
    return this.usersService.getUserById(id);
  }

  @ApiOperation({ summary: 'Give role' })
  @ApiResponse({ status: 200 })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('/role')
  addRole(@Body() dto: AddRoleDto) {
    console.log(dto);
    return this.usersService.addRole(dto);
  }

  @ApiOperation({ summary: 'Ban user' })
  @ApiResponse({ status: 200 })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('/ban')
  ban(@Body() dto: BanUserDto) {
    return this.usersService.ban(dto);
  }
}
