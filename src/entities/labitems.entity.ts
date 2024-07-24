// user.entity.ts

import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Types } from './types.entity';
import { Sections } from './sections.entity';
import { Grades } from './grades.entity';
import { Locations } from './locations.entity';

@Entity()
export class LabItems {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp'})
  time: Date;

  @Column()
  name: string;

  @ManyToOne(()=>Types)
  @JoinColumn({name:'typeName'})
  typeItem: Types;

  @ManyToOne(()=>Sections)
  @JoinColumn({name:'sectionName'})
  section: Sections;

  @ManyToOne(()=>Grades)
  @JoinColumn({name:'grade_num'})
  grade_num: Grades;

  @Column()
  count: number;

  @Column()
  crashCount: number;

//   @Column()
//   img: number;

  @Column()
  img: string;

  @Column()
  documentItem: string;

  @ManyToOne(()=>Locations)
  @JoinColumn({name:'locationName'})
  locationItem: Locations;
}
