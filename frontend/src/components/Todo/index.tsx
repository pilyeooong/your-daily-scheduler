import React from 'react';
import { TodoItem } from './styles';

interface IProps {
  id: number;
  content: string;
};

const Todo: React.FC<IProps> = ({ id, content }) => {
  return (
    <TodoItem>
      {content}
    </TodoItem>
  )
}

export default Todo;
