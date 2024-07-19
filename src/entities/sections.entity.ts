// user.entity.ts

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Sections {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

//   @Column()
//   lastName: string;

//   @Column({ default: true })
//   isActive: boolean;
}
