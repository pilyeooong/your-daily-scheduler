import React from 'react';
import { DraggableProvided } from 'react-beautiful-dnd';
import { TodoItem } from './styles';

interface IProps {
  id: number;
  content: string;
  provided: DraggableProvided
};

const Todo: React.FC<IProps> = ({ id, content, provided }) => {
  return (
    <TodoItem ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
      {content}
    </TodoItem>
  )
}

export default Todo;
