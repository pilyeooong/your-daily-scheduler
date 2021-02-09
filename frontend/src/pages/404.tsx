import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';

const NotFound = () => {
  const history = useHistory();

  useEffect(() => {
    alert('존재하지 않는 페이지 혹은 접근 할 수 없습니다');
    history.replace('/');
  }, []);

  return (
    <div>
      <ErrorMessage>
        <div>존재하지 않는 페이지 혹은 접근 할 수 없습니다</div>
        <Link to="/">메인화면으로 돌아가기</Link>
      </ErrorMessage>
    </div>
  );
};

export default NotFound;

const ErrorMessage = styled.div`
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 1.5rem;
  font-weight: bold;
  color: lightgray;

  & div {
    margin-bottom: 3rem;
  }

  & a {
    color: navy;
  }
`;
