import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { User } from './users.entity';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/create.user.dto';
import { UpdateUserDTO } from './dto/update.user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('managers')
  getAllNotUsers() {
    return this.userService.findManagers();
  }

  @Get('/:id')
  getUserById(@Param('id') id: number): Promise<User> {
    return this.userService.findOneById(id);
  }

  @Post()
  createUser(@Body() user: CreateUserDTO): Promise<User> {
    return this.userService.create(user);
  }

  @Put('/:id')
  updateUser(
    @Param('id') id: number,
    @Body() user: UpdateUserDTO,
  ): Promise<boolean> {
    return this.userService.update(id, user);
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: number): Promise<boolean> {
    return await this.userService.remove(id);
  }
}
