import React from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import RegistrationForm from './RegistrationForm'; 

class RegistrationPage extends React.Component {
    state = {
        user: {
          firstname: "",
          surname: "",
          username: "",
          password: "",  
          birthdate: ""
        },
        errors: {},
        submitted: false,
      };

    render() {
      const {
        user: { firstname, surname, username, password },
      } = this.state;
      return (
        <div
        css={css`
          display: grid;
          width: 100vw;
          grid-template-columns: 2fr 3fr 2fr;
          font-family: Arial;
          color: white;
          background-color: #ebedf0;
        `}
      >
        <div
          css={css`
            grid-column: 2/3;
            margin: 20px;
          `}
        >
          <RegistrationForm />
        </div>
      </div>
      );
    }
}

export default RegistrationPage;