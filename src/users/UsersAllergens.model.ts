import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { User } from './users.model';
import { Allergen } from '../allergens/allergens.model';

@Table({ tableName: 'users_allergens' })
export class UsersAllergens extends Model<UsersAllergens> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
    unique: true,
  })
  id: number;

  @ForeignKey(() => User)
  @Column({ type: DataTypes.INTEGER })
  userId: number;

  @ForeignKey(() => Allergen)
  @Column({ type: DataTypes.INTEGER })
  allergenId: number;
}
