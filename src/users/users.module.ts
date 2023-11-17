import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users.model';
import { Allergen } from '../allergens/allergens.model';
import { HttpModule, HttpService } from '@nestjs/axios';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [SequelizeModule.forFeature([User, Allergen]), HttpModule],
})
export class UsersModule {}
