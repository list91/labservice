// user.entity.ts

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Types {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type_name: string;

//   @Column()
//   lastName: string;


//   @Column({ default: true })
//   isActive: boolean;
}
