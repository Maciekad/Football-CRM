import React, { useEffect, useState } from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import AvatarUpload from './AvatarUpload';
import UserForm from './UserForm';
import { useAuth0 } from "@auth0/auth0-react";

const UserProfile = () => {

  const { user, isLoading } = useAuth0();
 
  if (isLoading) {
    return <div>Loading ...</div>;
  }
  console.log(user)
    return (
      <div
        css={css`
          margin: 60px 20px 0px 20px;
          display: flex;
        `}
      >
        <AvatarUpload user={user}/>
        <UserForm user={user} />
      </div>
    );
  }

export default UserProfile;