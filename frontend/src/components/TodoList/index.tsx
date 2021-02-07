import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DroppableProvided,
  DraggableProvided,
  DropResult,
} from 'react-beautiful-dnd';
import { ITodo } from '../../typings/db';
import TodoForm from '../TodoForm';
import Todo from '../Todo';
import { ListContainer } from './styles';
import Button from '../Button';

interface IProps {
  scheduleId: number;
  revalidate: () => Promise<boolean>;
  todos: ITodo[];
}

const TodoList: React.FC<IProps> = ({ todos: originalTodos, scheduleId, revalidate }) => {
  const [isSwitched, setIsSwitched] = useState<boolean>(false);
  const [isSwitching, setIsSwitching] = useState<boolean>(false);
  const [mutableTodos, setMutableTodos] = useState<ITodo[]>([]);

  useEffect(() => {
    if (originalTodos) {
      setMutableTodos(originalTodos);
    }
  }, [originalTodos]);

  const reorder = useCallback((list: ITodo[], startIndex: number, endIndex: number): ITodo[] => {
    const result = [...list];
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  }, []);

  const onDragEnd = useCallback(
    (result: DropResult) => {
      if (!result.destination) {
        setIsSwitching(false);
        return;
      }

      const items = reorder(mutableTodos, result.source.index, result.destination.index);

      setIsSwitched(true);
      setIsSwitching(false);
      setMutableTodos(items);
    },
    [mutableTodos, reorder]
  );

  const onDragStart = useCallback(() => {
    setIsSwitching(true);
  }, []);

  const onSwtichOrders = useCallback(async () => {
    const switchedResult = mutableTodos.map((todo) => todo.index);
    await axios.post(`/todos/orders`, { switchedResult });
    setIsSwitched(false);
  }, [mutableTodos]);

  const onCloseSwitchButton = useCallback(() => {
    revalidate();
    setMutableTodos(originalTodos);
    setIsSwitched(false);
  }, [originalTodos, revalidate]);

  return (
    <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
      <Droppable droppableId="todos">
        {(provided: DroppableProvided) => (
          <ListContainer className="todos" ref={provided.innerRef} {...provided.droppableProps}>
            <h2 className="title">TODO</h2>
            {mutableTodos ? (
              mutableTodos.map((todo, index) => (
                <Draggable key={todo.index} draggableId={`${todo.index}`} index={index}>
                  {(provided: DraggableProvided) => (
                    <Todo key={todo.id} id={todo.id} content={todo.content} provided={provided} />
                  )}
                </Draggable>
              ))
            ) : (
              <span>Loading</span>
            )}
            {isSwitched && (
              <div className="switch-buttons">
                <Button text={'적 용'} onClickAction={onSwtichOrders} />
                <Button text={'취 소'} onClickAction={onCloseSwitchButton} color={'red'} />
              </div>
            )}
            {!isSwitched && !isSwitching && (
              <TodoForm scheduleId={scheduleId} revalidate={revalidate} />
            )}
            {provided.placeholder}
          </ListContainer>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TodoList;
