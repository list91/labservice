// user.entity.ts

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  pass: string;

  @Column()
  admin: boolean;

//   @Column()
//   lastName: string;


//   @Column({ default: true })
//   isActive: boolean;
}
