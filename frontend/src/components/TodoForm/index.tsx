import React, { useCallback } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';

interface IForm {
  content: string;
}

interface IProps {
  scheduleId: number;
  revalidate: () => Promise<boolean>;
}

const Form: React.FC<IProps> = ({ revalidate, scheduleId }) => {
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

  return (
    <div>
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
      </form>
    </div>
  );
};

export default Form;
