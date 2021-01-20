import React, { Component } from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import SettingsForm from './SettingsForm';

class Settings extends Component {
    
    render() { 
        return (
        
              <div css={css`margin: 70px 20px 10px 20px; width: 50vw;`}>
                <div>
                  <SettingsForm/>
                </div>
              </div>
       
        );
    }
}
 
export default Settings;