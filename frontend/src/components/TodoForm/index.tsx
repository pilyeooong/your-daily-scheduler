import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import Button from '../Button';
import { FormContainer } from './styles';
import { toast } from 'react-toastify';

interface IForm {
  content: string;
}

interface IProps {
  scheduleId: number;
  revalidate: () => Promise<boolean>;
}

const Form: React.FC<IProps> = ({ scheduleId, revalidate }) => {
  const [formVisible, setFormVisible] = useState<boolean>(false);
  const { register, getValues, errors, handleSubmit, reset } = useForm<IForm>({
    mode: 'onChange',
  });

  const onSubmit = useCallback(() => {
    const { content } = getValues();
    axios
      .post(
        '/todo',
        { content, scheduleId },
        {
          headers: {
            Authorization: `${localStorage.getItem('jwtToken')}`,
          },
        }
      )
      .then(() => {
        reset();
        toast.success('할 일을 등록하였습니다!', {
          position: toast.POSITION.TOP_CENTER,
        });
        revalidate();
      })
      .catch((err) => {
        console.error(err);
        toast.error('할 일 등록에 실패하였습니다!', {
          position: toast.POSITION.TOP_CENTER,
        });
      });
  }, [getValues, revalidate, reset, scheduleId]);

  const onClickAddForm = useCallback(() => {
    setFormVisible((prev) => !prev);
  }, []);

  return (
    <FormContainer>
      {formVisible ? (
        <>
          <form action="" onSubmit={handleSubmit(onSubmit)}>
            <div className="submit-input">
              <input
                ref={register({
                  required: '내용을 입력해주세요',
                })}
                type="text"
                name="content"
                required
              />
            </div>
            <div className="submit-button">
              <Button type="submit" text={'입 력'} />
              <Button text={'취 소'} onClickAction={onClickAddForm} color={'red'} />
            </div>
          </form>
          {errors.content?.message && <div className="todo-error">{errors.content.message}</div>}
        </>
      ) : (
        <div className="add-button">
          <Button text={'할 일 추가'} onClickAction={onClickAddForm} />
        </div>
      )}
    </FormContainer>
  );
};

export default Form;
