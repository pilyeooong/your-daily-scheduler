import React from 'react';
import { ButtonContainer } from './styles';

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  onClickAction?: () => void;
  color?: string;
}

const Button: React.FC<IProps> = ({ text, onClickAction, color, ...props }) => {
  return (
    <ButtonContainer {...props} onClick={onClickAction} style={{ background: `${color}` }}>
      {text}
    </ButtonContainer>
  );
};

export default Button;
