import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserCreateDto } from './dto/user-create.dto';
import { UserIdGuard } from './user.guard';
import { AddAllergensDto } from './dto/add-allergens.dto';
import { User } from './users.model';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/create')
  create(@Body() user: UserCreateDto) {
    return this.usersService.create(user);
  }

  @UseGuards(UserIdGuard)
  @Post('/allergens')
  async addAllergens(@Body() dto: AddAllergensDto, @Req() req: { user: User }) {
    return this.usersService.setAllergens(dto, req.user.id);
  }

  @Get('/weather')
  async getWeather(@Query() { lat, lon }: { lat: string; lon: string }) {
    return this.usersService.getWeather({ lat, lon });
  }
}
