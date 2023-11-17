import { Module } from '@nestjs/common';
import { AllergensController } from './allergens.controller';
import { AllergensService } from './allergens.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Allergen } from './allergens.model';
import { UsersService } from '../users/users.service';
import { User } from '../users/users.model';
import { HttpModule, HttpService } from '@nestjs/axios';

@Module({
  controllers: [AllergensController],
  providers: [AllergensService, UsersService],
  imports: [SequelizeModule.forFeature([Allergen, User]), HttpModule],
})
export class AllergensModule {}
