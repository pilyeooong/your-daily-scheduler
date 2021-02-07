import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import Button from '../Button';
import { FormContainer } from './styles';

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
    setFormVisible((prev) => !prev);
  }, []);

  return (
    <FormContainer>
      {formVisible ? (
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
          {errors.content?.message && <span>{errors.content.message}</span>}
          <div className="submit-button">
            <Button type="submit" text={'입 력'} />
            <Button text={'취 소'} onClickAction={onClickAddForm} color={'red'} />
          </div>
        </form>
      ) : (
        <div className="add-button">
          <Button text={'할 일 추가'} onClickAction={onClickAddForm} />
        </div>
      )}
    </FormContainer>
  );
};

export default Form;
