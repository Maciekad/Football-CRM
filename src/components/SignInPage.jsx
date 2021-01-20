import React from 'react';
import { Link } from 'react-router-dom';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import FormInput from './FormInput';
import Button from './Button';
import SignInForm from './SignInForm';


class SignInPage extends React.Component {
  state = {
    user: {
      username: "",
      password: "",
    },
    errors: {},
    submitted: false,
  };

  render() {
    const {
      user: { username, password },
    } = this.state;
    return (
      <div
        css={css`
          display: grid;
          height: 100vh;
          width: 100vw;
          grid-template-columns: 2fr 3fr 2fr;
          grid-template-rows: 1fr 5fr 1fr;
          font-family: Arial;
          color: white;
          background-color: #ebedf0;
        `}
      >
        <div
          css={css`
            grid-column: 2/3;
            grid-row: 2/3;
            margin: 20px;
          `}
        >
          <SignInForm />
        </div>
      </div>
    );
  }
}

export default SignInPage;