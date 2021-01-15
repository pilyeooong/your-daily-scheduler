import CoreEntity from './Core';
import { Entity, Column, ManyToOne, getRepository } from 'typeorm';
import Schedule from './Schedule';

@Entity()
export default class Todo extends CoreEntity {
  @Column()
  content!: string;

  @Column({ default: false })
  completed!: boolean;

  @Column({ nullable: true })
  index!: number;

  @ManyToOne(() => Schedule, (schedule) => schedule.todos, {
    onDelete: 'CASCADE',
  })
  schedule!: Schedule;
}

export const appendTodoIndex = async (scheduleId: number, todoId: number) => {
  const todoRepository = await getRepository(Todo);
  const todoCount = await todoRepository.count({ where: { schedule: scheduleId }});
  const nextIndex = todoCount;

  const newTodo = await todoRepository.findOne({ where: { id: todoId }});
  if (!newTodo) {
    return;
  }
  newTodo.index = nextIndex;
  await todoRepository.save(newTodo);
  return newTodo; 
};
