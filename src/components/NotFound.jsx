import React from 'react';
import { Link } from 'react-router-dom';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';

const NotFound = () => (
  <div css={css`margin: 70px;`}>
    <h1>404 - Not Found!</h1>
    <Link to="/">
      Go Home
    </Link>
  </div>
);

export default NotFound;