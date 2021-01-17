import React from 'react';
import useSWR from 'swr';
import { ITodo } from '../../typings/db';
import fetcher from '../../utils/fetcher';
import TodoForm from '../TodoForm';
import Todo from '../Todo';
import { ListContainer } from './styles';

interface IProps {
  scheduleId: number;
}

const TodoList: React.FC<IProps> = ({ scheduleId }) => {

  const { data: todoData, revalidate } = useSWR<ITodo[]>(`/todos/${scheduleId}`, fetcher);
  
  return (
    <ListContainer>
      <h2 className="title">TODO</h2>
      {todoData?.map((todo) => (
        <Todo key={todo.id} id={todo.id} content={todo.content} />
      ))}
      <TodoForm scheduleId={scheduleId} revalidate={revalidate} />
    </ListContainer>
  );
};

export default TodoList;
