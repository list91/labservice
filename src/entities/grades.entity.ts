// user.entity.ts

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Grades {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  grade_num: number;

//   @Column()
//   lastName: string;

//   @Column({ default: true })
//   isActive: boolean;
}
