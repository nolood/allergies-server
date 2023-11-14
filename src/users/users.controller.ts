import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserCreateDto } from './dto/user-create.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/create')
  create(@Body() user: UserCreateDto) {
    return this.usersService.create(user);
  }
}
