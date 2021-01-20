import React from 'react';
import { Link } from 'react-router-dom';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';

const LoadingPage = () => (
  <div css={css`margin: 70px;`}>
    <h1>Loading...</h1>
  </div>
);

export default LoadingPage;