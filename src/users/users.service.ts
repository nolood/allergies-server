import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { UserCreateDto } from './dto/user-create.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private readonly userRepository: typeof User,
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
}
