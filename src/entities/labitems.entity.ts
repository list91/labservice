// user.entity.ts
// curl http://localhost:300-X POST http://localhost:3000/create_item -H "Content-Type: application/json" -d '{
//   "time": "2024-07-24 14:30:00",
//   "name": "lab item 1",
//   "type_item": "тип1",
//   "section": "test section",
//   "grade_num": "2",
//   "count": "3",
//   "crash_count": "1",
//   "img": "img/qq.png",
//   "document_item": "docs/lsadj.pdf",
//   "location_item": "л2п"
// }'
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Types } from './types.entity';
import { Sections } from './sections.entity';
import { Grades } from './grades.entity';
import { Locations } from './locations.entity';

@Entity()
export class LabItems {
  @PrimaryGeneratedColumn()
  id: number;

  // @ManyToOne(() => Grades,(Grades) => Grades.grade_num, { cascade: true })

  // @Column({ type: 'timestamp'})
  @Column()
  time: string;

  @Column()
  name: string; 

  @ManyToOne(()=>Types,(Types) => Types.type_name, { cascade: true })
  @JoinColumn({name:'type_name'})
  type_item: Types;

  @ManyToOne(()=>Sections, (Sections) => Sections.section_name, { cascade: true })
  @JoinColumn({name:'section_name'})
  section: Sections;

  @ManyToOne(()=>Grades, (Grades) => Grades.grade_num, { cascade: true })
  @JoinColumn({name:'grade_num'})
  grade_num: Grades;

  @Column()
  count: number;

  @Column()
  crash_count: number;

//   @Column()
//   img: number;

  @Column()
  img: string;

  @Column()
  document_item: string;

  @ManyToOne(()=>Locations, (Locations) => Locations.location_name, { cascade: true })
  @JoinColumn({name:'location_name'})
  location_item: Locations;
}

