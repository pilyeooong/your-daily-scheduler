import CoreEntity from './Core';
import { Entity, Column, ManyToOne } from 'typeorm';
import Schedule from './Schedule';

@Entity()
export default class Event extends CoreEntity {
  @Column({ type: 'varchar', length: 64 })
  date!: string;

  @Column({ type: 'varchar', length: 255 })
  content!: string;

  @Column({ type: 'timestamp', nullable: true })
  startTime?: Date;

  @Column({ type: 'timestamp', nullable: true })
  endTime?: Date;

  @ManyToOne(() => Schedule, (schedule) => schedule.events, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  schedule!: Schedule;
}
