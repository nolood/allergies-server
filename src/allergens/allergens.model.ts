import { BelongsToMany, Column, Model, Table } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { UsersAllergens } from '../users/UsersAllergens.model';
import { User } from '../users/users.model';

@Table({ tableName: 'allergens' })
export class Allergen extends Model<Allergen> {
  @Column({
    primaryKey: true,
    unique: true,
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
  @Column({ type: DataTypes.STRING })
  symptoms: string;
  @Column({ type: DataTypes.STRING })
  crossReactions: string;

  @BelongsToMany(() => User, () => UsersAllergens)
  users: User[];
}
