import React from 'react'

interface IProps {
  id: number;
  content: string;
};

const Todo: React.FC<IProps> = ({ id, content }) => {
  return (
    <div>
      {content}
    </div>
  )
}

export default Todo;
