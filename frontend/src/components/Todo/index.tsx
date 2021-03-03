import React, { useState, useCallback, useEffect } from 'react';
import { DraggableProvided } from 'react-beautiful-dnd';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-regular-svg-icons';

import { EditForm, TodoItem } from './styles';
import { toast } from 'react-toastify';

interface IProps {
  id: number;
  content: string;
  provided: DraggableProvided;
  revalidate: () => Promise<boolean>;
}

const Todo: React.FC<IProps> = ({ id, content, provided, revalidate }) => {
  const [editable, setEditable] = useState<boolean>(false);
  const [editedContent, setEditedContent] = useState<string>(content);

  useEffect(() => {
    console.log(editedContent);
  }, [editedContent]);

  const onEditTodo = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      await axios
        .patch(
          `/todo/${id}`,
          { content: editedContent },
          { headers: { Authorization: `${localStorage.getItem('jwtToken')}` } }
        )
        .then(() => {
          toast.success('수정을 완료하였습니다 !', {
            position: toast.POSITION.TOP_CENTER,
          });
          revalidate();
          setEditable(false);
        })
        .catch((err) => {
          console.error(err);
          toast.error('수정에 실패하였습니다 !', {
            position: toast.POSITION.TOP_CENTER,
          });
        });
    },
    [editedContent]
  );

  const onDeleteTodo = useCallback(async () => {
    const willDelete = window.confirm('정말 삭제 하시겠습니까 ?');
    if (willDelete) {
      await axios
        .delete(`/todo/${id}`, {
          headers: { Authorization: `${localStorage.getItem('jwtToken')}` },
        })
        .then(() => {
          toast.success('삭제를 완료하였습니다 !', {
            position: toast.POSITION.TOP_CENTER,
          });
          setEditable(false);
          revalidate();
        })
        .catch((err) => {
          console.error(err);
          toast.error('삭제에 실패하였습니다 !', {
            position: toast.POSITION.TOP_CENTER,
          });
        });
    }
  }, []);

  const onCancelEdit = useCallback(() => {
    setEditable((prev) => !prev);
    setEditedContent(content);
  }, [content]);

  return (
    <TodoItem ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
      {editable ? (
        <EditForm onSubmit={onEditTodo}>
          <input
            type="text"
            defaultValue={content}
            onChange={(e) => setEditedContent(e.currentTarget.value)}
          />
          <div className="edit-form-buttons">
            <button type="submit">수 정</button>
            <button onClick={onCancelEdit}>취 소</button>
          </div>
        </EditForm>
      ) : (
        <>
          {content}
          <div className="todo-action">
            <FontAwesomeIcon
              icon={faEdit}
              onClick={() => setEditable((prev) => !prev)}
            ></FontAwesomeIcon>
            <FontAwesomeIcon icon={faTrashAlt} onClick={onDeleteTodo}></FontAwesomeIcon>
          </div>
        </>
      )}
    </TodoItem>
  );
};

export default Todo;
