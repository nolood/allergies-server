import { Module } from '@nestjs/common';
import { AllergensController } from './allergens.controller';
import { AllergensService } from './allergens.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Allergen } from './allergens.model';

@Module({
  controllers: [AllergensController],
  providers: [AllergensService],
  imports: [SequelizeModule.forFeature([Allergen])],
})
export class AllergensModule {}
