import { Column, Model, Table } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({ tableName: 'users' })
export class User extends Model<User> {
  @Column({ primaryKey: true, type: DataTypes.INTEGER, unique: true })
  id: number;
  @Column({ type: DataTypes.STRING })
  first_name: string;
  @Column({ type: DataTypes.STRING })
  last_name: string;
  @Column({ type: DataTypes.STRING })
  photo_100: string;
  @Column({ type: DataTypes.STRING })
  photo_200: string;
  @Column({ type: DataTypes.STRING })
  photo_base: string;
}
