import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';

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
        revalidate();
      })
      .catch((err) => {
        console.error(err);
      });
  }, [getValues, revalidate, reset, scheduleId]);

  const onClickAddForm = useCallback(() => {
    setFormVisible(prev => !prev);
  }, []);

  return (
    <div>
      {formVisible ? (
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <input
            ref={register({
              required: '내용을 입력해주세요',
            })}
            type="text"
            name="content"
            placeholder="내용을 입력해주세요"
            required
          />
          {errors.content?.message && <span>{errors.content.message}</span>}
          <button type="submit">입력</button>
          <button onClick={onClickAddForm}>X</button>
        </form>
      ) : (
        <span onClick={onClickAddForm}>+ 할 일을 추가하세요</span>
      )}
    </div>
  );
};

export default Form;
