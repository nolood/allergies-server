import {
  HttpException,
  HttpStatus,
  Injectable,
  OnModuleInit,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Allergen } from './allergens.model';
import * as data from '../data';
import { AllergensByDateDto } from './dto/allergens-by-date.dto';
import { User } from '../users/users.model';
import { DateTime } from 'luxon';

@Injectable()
export class AllergensService implements OnModuleInit {
  constructor(
    @InjectModel(Allergen) private readonly allergenRepository: typeof Allergen,
    @InjectModel(User) private readonly userRepository: typeof User,
  ) {}

  async onModuleInit() {
    await this.fillDatabase();
  }

  async fillDatabase() {
    const dataToSeed = data.default;

    for (let i = 0; i < dataToSeed.length; i++) {
      const allergen = await this.allergenRepository.findOne({
        where: { id: dataToSeed[i].id },
      });

      if (!allergen) {
        await this.allergenRepository.create(dataToSeed[i]);
      }
    }
  }

  async getAll() {
    return this.allergenRepository.findAll();
  }

  async getByDateAndUser(dto: AllergensByDateDto, id: number) {
    const result = [];
    const user = await this.userRepository.findOne({
      where: { id },
      include: [{ model: Allergen }],
    });

    if (!user) {
      throw new HttpException('user not found', HttpStatus.BAD_REQUEST);
    }

    const startOfWeek = DateTime.fromFormat(dto.start, 'dd.MM');
    const endOfWeek = DateTime.fromFormat(dto.end, 'dd.MM');

    for (
      let currentDay = startOfWeek;
      currentDay <= endOfWeek;
      currentDay = currentDay.plus({ days: 1 })
    ) {
      const formattedCurrentDay = currentDay.toFormat('dd.MM');

      const allergensInDay = user.allergies.filter((allergen) => {
        const allergenStart = DateTime.fromFormat(allergen.start, 'dd.MM');
        const allergenEnd = DateTime.fromFormat(allergen.end, 'dd.MM');
        return currentDay >= allergenStart && currentDay <= allergenEnd;
      });

      result.push({
        current: formattedCurrentDay,
        dayofweek: currentDay.toFormat('ccc', { locale: 'ru-RU' }),
        allergens: allergensInDay,
      });
    }

    return result;
  }

  async getByUser(id: number) {
    return this.allergenRepository.findAll({
      include: [{ model: User, where: { id } }],
    });
  }

  async getByMonth(id: number, month: string) {
    const allergens = await this.getByUser(id)

    const targetDate = DateTime.fromFormat(month, 'MM');

    const filteredAllergies = allergens.filter((allergen) => {
      const start = DateTime.fromFormat(allergen.start, 'dd.MM');
      const end = DateTime.fromFormat(allergen.end, 'dd.MM');

      return start <= targetDate && targetDate <= end;
    });

    return filteredAllergies;
  }
}
