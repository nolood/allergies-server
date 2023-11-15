import {
  BelongsToMany,
  Column,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { Allergen } from '../allergens/allergens.model';
import { UsersAllergens } from './UsersAllergens.model';

@Table({ tableName: 'users' })
export class User extends Model<User> {
  @Column({ primaryKey: true, type: DataTypes.INTEGER, unique: true })
  id: number;
  @Column({ type: DataTypes.STRING })
  first_name: string;
  @Column({ type: DataTypes.STRING })
  last_name: string;
  @Column({ type: DataTypes.STRING(500) })
  photo_100: string;
  @Column({ type: DataTypes.STRING(500) })
  photo_200: string;
  @Column({ type: DataTypes.STRING(500) })
  photo_base: string;

  @BelongsToMany(() => Allergen, () => UsersAllergens)
  allergies: Allergen[];
}
