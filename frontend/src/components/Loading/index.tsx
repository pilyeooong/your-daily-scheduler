import React from 'react';
import Loader from 'react-loader-spinner';
import { Container } from './styles';

const Loading = () => {
  return (
    <Container>
      <Loader
        type="Puff"
        color="#00BFFF"
        height={50}
        width={50}
        timeout={3000}
      />
    </Container>
  );
};

export default Loading;
