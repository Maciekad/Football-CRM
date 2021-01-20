import React from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';

const Button = (props) => {
  return (
    <button
      type={props.type}
      onClick={props.handleClick}
      className="btn btn-primary"
      css={css`
        width: 150px;
        border-radius: 5px;
        color: white;
        background-color: #0275d8;
        text-decoration: none;
        border-color: cornflowerblue;
        :focus {
          outline: none;
        }
        cursor: pointer;
        :hover {
          background-color: #1167b1;
        }
      `}
    >
      {props.label}
    </button>
  );
};

export default Button;