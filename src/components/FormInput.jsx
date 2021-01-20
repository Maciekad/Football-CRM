import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';

const FormInput = ({
    name,
    type,
    placholder,
    onChange,
    value,
    minValue,
    maxValue,
    error,
    children,
    ...props
}) => {

    return (
      <div className="form-group">
        <input
          id={name}
          className="form-control"
          name={name}
          type={type}
          placeholder={placholder}
          onChange={onChange}
          value={value}
          min={minValue}
          max={maxValue}
          style={error && { border: "solid 1px red" }}
          css={css`
            font-size: medium;
            margin: 0px 20px 0px 0px;
            border-radius: 5px;
            padding: 5px;
            text-decoration: none;
            :focus {
              outline: none;
            }
            cursor: pointer;
            :hover {
              background-color: #d3d3d3;
            }
          `}
        />
        {error && (
          <p
            css={css`
              color: red;
              font-size: 15px;
              margin: 0px 0px 4px 0px;
            `}
          >
            {error}
          </p>
        )}
      </div>
    );
}

export default FormInput;

FormInput.defaultProps = {
    type: "text"
}

FormInput.propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
    placeholder: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['text', 'number', 'password']),
    value: PropTypes.any,
    minValue: PropTypes.number,
    maxValue: PropTypes.number,
    onChange: PropTypes.func.isRequired
}