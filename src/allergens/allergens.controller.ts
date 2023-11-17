import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AllergensService } from './allergens.service';
import { AllergenBaseDto } from './dto/allergen-base.dto';
import { UserIdGuard } from '../users/user.guard';
import { AllergensByDateDto } from './dto/allergens-by-date.dto';
import { User } from '../users/users.model';

@Controller('allergens')
export class AllergensController {
  constructor(private readonly allergensService: AllergensService) {}

  @Get('/')
  async getAllergens() {
    return this.allergensService.getAll();
  }

  @UseGuards(UserIdGuard)
  @Post('/week')
  async getAllergensByWeek(
    @Body() dto: AllergensByDateDto,
    @Req() req: { user: User },
  ) {
    return this.allergensService.getByDateAndUser(dto, req.user.id);
  }

  @UseGuards(UserIdGuard)
  @Get('/byuser')
  async getAllergensByUser(@Req() req: { user: User }) {
    return this.allergensService.getByUser(req.user.id);
  }

  @UseGuards(UserIdGuard)
  @Get('/month/:month')
  async getAllergensByMonth(
    @Req() req: { user: User },
    @Param('month') month: string,
  ) {
    return this.allergensService.getByMonth(req.user.id, month);
  }
}
