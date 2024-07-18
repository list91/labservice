import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';
// класс для создания записей в любую табл
@Entity()
export class Item extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('simple-json')
  data: Record<string, any>;

  async saveData(): Promise<this> {
    this.data = {
      name: ""
    };

    return await super.save();
  }
}
