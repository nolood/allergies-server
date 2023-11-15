import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Allergen } from './allergens.model';
import { AllergenBaseDto } from './dto/allergen-base.dto';
import * as data from '../data';
@Injectable()
export class AllergensService implements OnModuleInit {
  constructor(
    @InjectModel(Allergen) private readonly allergenRepository: typeof Allergen,
  ) {}

  async onModuleInit() {
    await this.fillDatabase();
  }

  async fillDatabase() {
    const dataToSeed = data.default;

    await this.allergenRepository.bulkCreate(dataToSeed);
  }

  async getAll() {
    return this.allergenRepository.findAll();
  }
}
