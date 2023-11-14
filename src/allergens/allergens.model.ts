import { Column, Model, Table } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({ tableName: 'allergens' })
export class Allergen extends Model<Allergen> {
  @Column({
    primaryKey: true,
    unique: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  })
  id: number;
  @Column({ type: DataTypes.STRING })
  title: string;
  @Column({ type: DataTypes.STRING })
  start: string;
  @Column({ type: DataTypes.STRING })
  end: string;
  @Column({ type: DataTypes.STRING })
  color: string;
}
