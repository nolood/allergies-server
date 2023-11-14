import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { AllergensModule } from './allergens/allergens.module';
import { UsersModule } from './users/users.module';
import { User } from './users/users.model';
import { Allergen } from './allergens/allergens.model';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: String(process.env.POSTGRES_PASSWORD),
      database: process.env.POSTGRES_DB,
      models: [User, Allergen],
      autoLoadModels: true,
    }),
    AllergensModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
