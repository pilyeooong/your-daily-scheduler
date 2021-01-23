import CoreEntity from './Core';
import { Entity, Column } from 'typeorm';

@Entity()
export default class Covid extends CoreEntity {
  @Column()
  date!: string;

  @Column({ unique: true })
  city!: string;

  @Column()
  totalCases!: string;

  @Column()
  increasedCases!: string;
}
