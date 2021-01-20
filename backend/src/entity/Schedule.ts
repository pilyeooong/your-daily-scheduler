import CoreEntity from './Core';
import { Entity, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import Todo from './Todo';
import User from './User';
import Event from './Event';

@Entity()
export default class Schedule extends CoreEntity {

  @OneToMany(() => Todo, todo => todo.schedule, { eager: true })
  todos?: Todo[];

  @OneToMany(() => Event, (event) => event.schedule)
  events?: Event[];

  @OneToOne(() => User, user => user.schedule, { onDelete: 'CASCADE' })
  @JoinColumn()
  user!: User;

}