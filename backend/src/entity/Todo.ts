import CoreEntity from './Core';
import { Entity, Column, ManyToOne } from 'typeorm';
import Schedule from './Schedule';

@Entity()
export default class Todo extends CoreEntity {
  @Column()
  content!: string;

  @ManyToOne(() => Schedule, (schedule) => schedule.todos, {
    onDelete: 'CASCADE',
  })
  schedule!: Schedule;
}
