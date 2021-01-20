import CoreEntity from './Core';
import { Entity, Column, ManyToOne } from 'typeorm';
import Schedule from './Schedule';

@Entity()
export default class Event extends CoreEntity {

  @Column()
  date!: string;

  @Column()
  content!: string;

  @ManyToOne(() => Schedule, (schedule) => schedule.events, { nullable: false })
  schedule!: Schedule;
}