import React from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';


function Footer(props) {
    return (
        <div
            css={css`
            grid-column: 1/3;
            grid-row: 3/4;
            font-family: Arial;
            font-size: 17px;
            color: white;
            padding: 15px;
            background-color: #001433;
            border-bottom: 1px solid black;       
        `}
        >
        </div>
    );
}

export default Footer;