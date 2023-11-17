import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { UserCreateDto } from './dto/user-create.dto';
import { AddAllergensDto } from './dto/add-allergens.dto';
import { Allergen } from '../allergens/allergens.model';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private readonly userRepository: typeof User,
    @InjectModel(Allergen) private readonly allergenRepository: typeof Allergen,
    private readonly httpService: HttpService,
  ) {}

  async getUserById(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }

  async create(dto: UserCreateDto) {
    const user = await this.getUserById(dto.id);

    if (user) {
      return false;
    }

    await this.userRepository.create(dto);

    return true;
  }

  async setAllergens(dto: AddAllergensDto, id: number) {
    const user = await this.getUserById(id);

    if (!user) {
      throw new HttpException('user not found', HttpStatus.BAD_REQUEST);
    }

    const data: Allergen[] = [];

    for (let i = 0; i < dto.allergens.length; i++) {
      const allergen = await this.allergenRepository.findOne({
        where: { id: dto.allergens[i] },
      });

      if (allergen) {
        data.push(allergen);
      }
    }

    await user.$set('allergies', data);
  }

  async getWeather({ lat, lon }: { lat: string; lon: string }) {
    const headers = {
      'X-Yandex-API-Key': process.env.WEATHER_API_KEY,
    };

    return this.httpService
      .get(
        `https://api.weather.yandex.ru/v2/forecast?lat=${lat}&lon=${lon}&[lang=ru_RU]`,
        {
          headers,
        },
      )
      .pipe(
        map((response) => {
          const newData = { ...response.data };

          if (newData.forecasts) {
            delete newData.forecasts;
          }

          return newData;
        }),
      );
  }
}
